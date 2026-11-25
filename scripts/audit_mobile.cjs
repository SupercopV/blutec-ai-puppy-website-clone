const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;
const OUT_DIR = path.join(__dirname, 'mobile_audit');
const USER_DATA = path.join(__dirname, '..', 'tmp_chrome_profile');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
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
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${USER_DATA}`,
    'about:blank'
  ]);

  try {
    const wsUrl = await getWsUrl();
    const newTargetRes = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' });
    const targetInfo = await newTargetRes.json();
    const client = new CDPClient(targetInfo.webSocketDebuggerUrl);
    await client.init();

    await client.send('Page.enable');
    await client.send('DOM.enable');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
      hasTouch: true
    });

    const pages = [
      { name: 'home', path: '/' },
      { name: 'puppies', path: '/puppies' },
      { name: 'how-it-works', path: '/how-it-works' },
      { name: 'happy-families', path: '/happy-families' },
      { name: 'gone-home', path: '/gone-home' },
      { name: 'faq', path: '/faq' },
      { name: 'contact', path: '/contact' }
    ];

    const auditResults = [];

    for (const p of pages) {
      console.log(`Auditing mobile page: ${p.name}`);
      
      // Localhost
      await client.send('Page.navigate', { url: `http://localhost:3000${p.path}` });
      await sleep(2500);

      const localOverflow = await client.send('Runtime.evaluate', {
        expression: `
          (() => {
            const docWidth = document.documentElement.scrollWidth;
            const winWidth = window.innerWidth;
            const elements = Array.from(document.querySelectorAll('*'));
            const overflowEls = elements.filter(el => {
              const rect = el.getBoundingClientRect();
              return rect.right > winWidth + 2;
            }).map(el => ({
              tag: el.tagName,
              id: el.id,
              class: el.className.toString ? el.className.toString().slice(0, 50) : '',
              right: el.getBoundingClientRect().right
            }));
            return {
              docWidth,
              winWidth,
              hasHorizontalScroll: docWidth > winWidth,
              overflowCount: overflowEls.length,
              sampleOverflows: overflowEls.slice(0, 5)
            };
          })()
        `,
        returnByValue: true
      });

      const shotLocal = await client.send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(OUT_DIR, `${p.name}_local.png`), Buffer.from(shotLocal.data, 'base64'));

      // Reference
      await client.send('Page.navigate', { url: `https://puppy.instabizweb.com${p.path}` });
      await sleep(3000);
      const shotRef = await client.send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(OUT_DIR, `${p.name}_ref.png`), Buffer.from(shotRef.data, 'base64'));

      auditResults.push({
        page: p.name,
        overflow: localOverflow.result.value
      });
    }

    // Now test Mobile Menu Drawer on both
    console.log('Testing mobile menu drawer...');
    // Localhost menu
    await client.send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(2000);
    await client.send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('button[aria-label="Open menu"], button[aria-expanded], .tp-header__menu-btn');
          const allBtns = Array.from(document.querySelectorAll('button'));
          const menuBtn = allBtns.find(b => b.textContent.includes('Menu')) || btn;
          if (menuBtn) menuBtn.click();
        })()
      `
    });
    await sleep(1000);
    const shotLocalMenu = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT_DIR, 'menu_local.png'), Buffer.from(shotLocalMenu.data, 'base64'));

    // Reference menu
    await client.send('Page.navigate', { url: 'https://puppy.instabizweb.com/' });
    await sleep(2500);
    await client.send('Runtime.evaluate', {
      expression: `
        (() => {
          const allBtns = Array.from(document.querySelectorAll('button'));
          const menuBtn = allBtns.find(b => b.textContent.includes('Menu'));
          if (menuBtn) menuBtn.click();
        })()
      `
    });
    await sleep(1000);
    const shotRefMenu = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT_DIR, 'menu_ref.png'), Buffer.from(shotRefMenu.data, 'base64'));

    console.log('Audit completed. Summary:');
    console.log(JSON.stringify(auditResults, null, 2));

    await client.close();
  } finally {
    chromeProc.kill();
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
