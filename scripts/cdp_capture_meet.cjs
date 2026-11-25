const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function getWsUrl() {
  return new Promise((resolve, reject) => {
    const req = http.get('http://127.0.0.1:9222/json/version', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.webSocketDebuggerUrl);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
  });
}

(async () => {
  console.log('Launching headless chrome...');
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1200));

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

    const target = await send('Target.createTarget', { url: 'http://localhost:3000/' });
    const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
    const sessionId = session.sessionId;

    const sendSession = (method, params = {}) => new Promise((resolve) => {
      const msgId = id++;
      callbacks.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, sessionId, method, params }));
    });

    await sendSession('Page.enable');
    await sendSession('Runtime.enable');

    // Wait past curtain
    await new Promise(r => setTimeout(r, 2200));

    // Scroll to start of Scene 2 (Meet the pups)
    await sendSession('Runtime.evaluate', {
      expression: `
        const meet = document.querySelector('.tp-meet');
        if (meet) meet.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    await new Promise(r => setTimeout(r, 800));

    // Get metrics
    const metricsRes = await sendSession('Runtime.evaluate', {
      expression: `(() => {
        const meet = document.querySelector('.tp-meet');
        const container = document.querySelector('[data-pin-range="true"]');
        const track = document.querySelector('.tp-meet__track');
        const actor = document.querySelector('.pup-actor');
        const meetRect = meet ? meet.getBoundingClientRect() : null;
        const containerRect = container ? container.getBoundingClientRect() : null;
        const actorRect = actor ? actor.getBoundingClientRect() : null;
        return {
          scrollY: window.scrollY,
          meetTop: meetRect ? meetRect.top : null,
          containerHeight: container ? container.style.height : null,
          trackScrollWidth: track ? track.scrollWidth : null,
          actorX: actorRect ? actorRect.left : null,
          actorY: actorRect ? actorRect.top : null,
          doorsCount: track ? track.children.length : 0
        };
      })()`,
      returnByValue: true
    });
    console.log('Metrics at start:', metricsRes.result.value);

    // Snap 1: Start of Scene 2
    const snap1 = await sendSession('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshot_meet_1_start.png', Buffer.from(snap1.data, 'base64'));
    console.log('Saved screenshot_meet_1_start.png');

    // Snap 2: 25% through Scene 2
    await sendSession('Runtime.evaluate', {
      expression: `window.scrollBy({ top: 900, behavior: 'instant' });`
    });
    await new Promise(r => setTimeout(r, 600));

    const snap2 = await sendSession('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshot_meet_2_quarter.png', Buffer.from(snap2.data, 'base64'));
    console.log('Saved screenshot_meet_2_quarter.png');

    // Snap 3: 60% through Scene 2
    await sendSession('Runtime.evaluate', {
      expression: `window.scrollBy({ top: 1200, behavior: 'instant' });`
    });
    await new Promise(r => setTimeout(r, 600));

    const snap3 = await sendSession('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshot_meet_3_mid.png', Buffer.from(snap3.data, 'base64'));
    console.log('Saved screenshot_meet_3_mid.png');

    // Snap 4: Near end (around "Meet them all")
    await sendSession('Runtime.evaluate', {
      expression: `window.scrollBy({ top: 1200, behavior: 'instant' });`
    });
    await new Promise(r => setTimeout(r, 600));

    const snap4 = await sendSession('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshot_meet_4_end.png', Buffer.from(snap4.data, 'base64'));
    console.log('Saved screenshot_meet_4_end.png');

    // Snap 5: Unpin into Scene 3
    await sendSession('Runtime.evaluate', {
      expression: `window.scrollBy({ top: 900, behavior: 'instant' });`
    });
    await new Promise(r => setTimeout(r, 600));

    const snap5 = await sendSession('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshot_meet_5_unpin.png', Buffer.from(snap5.data, 'base64'));
    console.log('Saved screenshot_meet_5_unpin.png');

    ws.close();
  } catch (err) {
    console.error('CDP Error:', err);
  } finally {
    chrome.kill();
  }
})();
