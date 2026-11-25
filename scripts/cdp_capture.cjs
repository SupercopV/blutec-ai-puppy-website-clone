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

    // 1. Hero screenshot
    const snapHero = await sendSession('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshot_hero.png', Buffer.from(snapHero.data, 'base64'));
    console.log('Saved screenshot_hero.png');

    // 2. Journey screenshot
    await sendSession('Runtime.evaluate', {
      expression: `
        const chat = document.querySelector('.tp-chat');
        if (chat) chat.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    await new Promise(r => setTimeout(r, 800));

    const snapChat = await sendSession('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshot_journey.png', Buffer.from(snapChat.data, 'base64'));
    console.log('Saved screenshot_journey.png');

    // 3. Footer screenshot
    await sendSession('Runtime.evaluate', {
      expression: `
        const footer = document.querySelector('footer');
        if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'end' });
      `
    });
    await new Promise(r => setTimeout(r, 800));

    const snapFooter = await sendSession('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshot_footer.png', Buffer.from(snapFooter.data, 'base64'));
    console.log('Saved screenshot_footer.png');

    ws.close();
  } catch (err) {
    console.error('CDP Error:', err);
  } finally {
    chrome.kill();
  }
})();
