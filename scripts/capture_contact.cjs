const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;
const USER_DATA = path.join(__dirname, '..', 'tmp_chrome_profile');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getWsUrl() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const data = await res.json();
      return data.webSocketDebuggerUrl;
    } catch {
      await sleep(200);
    }
  }
  throw new Error('Could not connect to Chrome debugging port');
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.msgId = 1;
    this.pending = new Map();
  }

  async init() {
    return new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.pending.has(msg.id)) {
          const { resolve, reject } = this.pending.get(msg.id);
          this.pending.delete(msg.id);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.msgId++;
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async close() {
    this.ws.close();
  }
}

async function run() {
  if (!fs.existsSync(USER_DATA)) {
    fs.mkdirSync(USER_DATA, { recursive: true });
  }

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${USER_DATA}`,
    'about:blank'
  ]);

  try {
    const wsUrl = await getWsUrl();
    console.log('Connected to Chrome via WebSocket:', wsUrl);

    // Create a new target page
    const newTargetRes = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' });
    const targetInfo = await newTargetRes.json();
    console.log('Target page created:', targetInfo.webSocketDebuggerUrl);

    const client = new CDPClient(targetInfo.webSocketDebuggerUrl);
    await client.init();

    await client.send('Page.enable');
    await client.send('DOM.enable');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1200,
      deviceScaleFactor: 1,
      mobile: false
    });

    // 1. Capture Local Initial Contact Page
    console.log('Navigating to http://localhost:3000/contact ...');
    await client.send('Page.navigate', { url: 'http://localhost:3000/contact' });
    await sleep(2500);

    const shot1 = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'contact_local_initial.png'), Buffer.from(shot1.data, 'base64'));
    console.log('Saved contact_local_initial.png');

    // 2. Fill form
    await client.send('Runtime.evaluate', {
      expression: `
        (() => {
          const form = document.querySelector('form.tp-letterform');
          if (!form) return 'No form found';
          const nameInput = form.querySelector('input[name="name"]');
          const phoneInput = form.querySelector('input[name="phone"]');
          const emailInput = form.querySelector('input[name="email"]');
          const areaInput = form.querySelector('input[name="area"]');
          const puppySelect = form.querySelector('select[name="puppyId"]');
          const msgInput = form.querySelector('textarea[name="message"]');

          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          const nativeTextAreaSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
          const nativeSelectSetter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;

          if (nameInput) {
            nativeInputValueSetter.call(nameInput, 'Alex Rover');
            nameInput.dispatchEvent(new Event('input', { bubbles: true }));
            nameInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
          if (phoneInput) {
            nativeInputValueSetter.call(phoneInput, '+971 50 123 4567');
            phoneInput.dispatchEvent(new Event('input', { bubbles: true }));
            phoneInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
          if (emailInput) {
            nativeInputValueSetter.call(emailInput, 'alex@example.com');
            emailInput.dispatchEvent(new Event('input', { bubbles: true }));
            emailInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
          if (areaInput) {
            nativeInputValueSetter.call(areaInput, 'Downtown Dubai');
            areaInput.dispatchEvent(new Event('input', { bubbles: true }));
            areaInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
          if (puppySelect) {
            puppySelect.value = 'e486e544-f1fd-48f9-8ba0-f556d7ee44e7';
            puppySelect.dispatchEvent(new Event('change', { bubbles: true }));
          }
          if (msgInput) {
            nativeTextAreaSetter.call(msgInput, 'We are looking forward to meeting Copper this weekend!');
            msgInput.dispatchEvent(new Event('input', { bubbles: true }));
            msgInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
          return 'Form filled';
        })()
      `
    });

    await sleep(300);
    const shotFilled = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'contact_local_filled.png'), Buffer.from(shotFilled.data, 'base64'));
    console.log('Saved contact_local_filled.png');

    // Submit form
    console.log('Submitting form...');
    await client.send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('button[type="submit"]');
          if (btn) btn.click();
        })()
      `
    });

    // Sealing phase screenshot
    await sleep(400);
    const shotSealing = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'contact_local_sealing.png'), Buffer.from(shotSealing.data, 'base64'));
    console.log('Saved contact_local_sealing.png');

    // Posting phase screenshot
    await sleep(1500);
    const shotPosting = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'contact_local_posting.png'), Buffer.from(shotPosting.data, 'base64'));
    console.log('Saved contact_local_posting.png');

    // Sent phase screenshot
    await sleep(2000);
    const shotSent = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'contact_local_sent.png'), Buffer.from(shotSent.data, 'base64'));
    console.log('Saved contact_local_sent.png');

    // 3. Capture Reference site
    console.log('Navigating to reference site https://puppy.instabizweb.com/contact ...');
    await client.send('Page.navigate', { url: 'https://puppy.instabizweb.com/contact' });
    await sleep(3500);
    const shotRef = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'contact_ref_initial.png'), Buffer.from(shotRef.data, 'base64'));
    console.log('Saved contact_ref_initial.png');

    await client.close();
  } finally {
    chromeProc.kill();
    console.log('Chrome closed.');
  }
}

run().catch((err) => {
  console.error('Error running test:', err);
  process.exit(1);
});
