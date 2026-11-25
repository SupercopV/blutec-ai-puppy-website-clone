const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=' + PORT,
    '--user-data-dir=C:\\Users\\lenovo\\Desktop\\Blutec Ai\\tmp_chrome_profile',
    'about:blank'
  ]);

  try {
    let wsUrl;
    for (let i = 0; i < 30; i++) {
      try {
        const res = await fetch('http://127.0.0.1:' + PORT + '/json/version');
        const data = await res.json();
        wsUrl = data.webSocketDebuggerUrl;
        break;
      } catch { await sleep(200); }
    }

    const newTargetRes = await fetch('http://127.0.0.1:' + PORT + '/json/new?about:blank', { method: 'PUT' });
    const targetInfo = await newTargetRes.json();
    const ws = new WebSocket(targetInfo.webSocketDebuggerUrl);

    let msgId = 1;
    const pending = new Map();
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id && pending.has(msg.id)) {
        pending.get(msg.id)(msg.result);
        pending.delete(msg.id);
      }
    };
    await new Promise(r => ws.onopen = r);
    const send = (method, params = {}) => new Promise(res => {
      const id = msgId++;
      pending.set(id, res);
      ws.send(JSON.stringify({ id, method, params }));
    });

    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

    // Scroll test on reference home
    await send('Page.navigate', { url: 'https://puppy.instabizweb.com/' });
    await sleep(2500);

    const scrolls = [700, 1400, 2100, 2800, 3600, 4400];
    for (const y of scrolls) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` });
      await sleep(400);
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`scripts/mobile_audit/home_scroll_${y}_ref.png`, Buffer.from(shot.data, 'base64'));
    }

    // Scroll test on local home
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(2500);

    for (const y of scrolls) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` });
      await sleep(400);
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`scripts/mobile_audit/home_scroll_${y}_local.png`, Buffer.from(shot.data, 'base64'));
    }

    ws.close();
  } finally {
    chromeProc.kill();
  }
}
run();
