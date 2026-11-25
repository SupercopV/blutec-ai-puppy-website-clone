const { spawn } = require('child_process');
const http = require('http');

async function getWsUrl() {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json/version', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data).webSocketDebuggerUrl));
    }).on('error', reject);
  });
}

(async () => {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--window-size=1440,900',
    'http://localhost:3000/'
  ]);
  await new Promise(r => setTimeout(r, 2200));

  try {
    const wsUrl = await getWsUrl();
    const ws = new WebSocket(wsUrl);
    let id = 1;
    const callbacks = new Map();
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (callbacks.has(msg.id)) {
        callbacks.get(msg.id)(msg.result || msg);
        callbacks.delete(msg.id);
      }
    };
    const send = (method, params = {}) => new Promise((resolve) => {
      const msgId = id++;
      callbacks.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
    await new Promise(r => ws.onopen = r);

    // Scroll into Scene 2
    await send('Runtime.evaluate', {
      expression: 'window.scrollTo(0, 1500);'
    });
    await new Promise(r => setTimeout(r, 600));

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('.tp-meet__teddy');
        const stage = document.querySelector('.tp-meet__stage');
        const floor = document.querySelector('.tp-meet__floor');
        const actor = document.querySelector('.pup-actor');
        const rect = el ? el.getBoundingClientRect() : null;
        const stageRect = stage ? stage.getBoundingClientRect() : null;
        const floorRect = floor ? floor.getBoundingClientRect() : null;
        const actorRect = actor ? actor.getBoundingClientRect() : null;
        return {
          scrollY: window.scrollY,
          stageRect,
          floorRect,
          teddyRect: rect,
          actorRect
        };
      })()`,
      returnByValue: true
    });
    console.log(JSON.stringify(res.result.value, null, 2));
    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
})();
