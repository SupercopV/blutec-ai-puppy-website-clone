const { spawn } = require('child_process');
const fs = require('fs');
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
    await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });

    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(3000);

    const desktopCheck = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const htmlDataset = { ...document.documentElement.dataset };
          const layer = document.querySelector('.pup-layer');
          const actor = document.querySelector('.pup-actor');
          const body = document.querySelector('.pup-actor__body');
          return {
            htmlDataset,
            layerAnchor: layer?.dataset.anchor,
            actorTransform: actor?.style.transform,
            bodyTransform: body?.style.transform
          };
        })()
      `,
      returnByValue: true
    });

    console.log('--- DESKTOP CHECK ON LOCALHOST ---');
    console.log(JSON.stringify(desktopCheck.result.value, null, 2));

    ws.close();
  } finally {
    chromeProc.kill();
  }
}
run();
