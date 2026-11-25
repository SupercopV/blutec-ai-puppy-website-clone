const http = require('http');

async function getWsUrl() {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json/list', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const list = JSON.parse(data);
        const page = list.find(p => p.type === 'page' && p.url.includes('localhost:3000'));
        resolve((page || list[0]).webSocketDebuggerUrl);
      });
    }).on('error', reject);
  });
}

(async () => {
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

  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      const meet = document.querySelector('.tp-meet');
      const track = document.querySelector('.tp-meet__track');
      const container = document.querySelector('[data-pin-range="true"]');
      const doors = track ? [...track.children].map(d => ({
        text: d.innerText.split('\\n')[0],
        left: d.offsetLeft,
        width: d.offsetWidth,
        open: d.dataset.open
      })) : [];
      return {
        trackScrollWidth: track?.scrollWidth,
        trackClientWidth: track?.clientWidth,
        containerHeight: container?.style.height,
        innerWidth: window.innerWidth,
        doorsCount: doors.length,
        doors
      };
    })()`,
    returnByValue: true
  });
  console.log(JSON.stringify(res.result.value, null, 2));
  process.exit(0);
})();
