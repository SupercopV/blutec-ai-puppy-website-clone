const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function testHeadless() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9223;
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1440,900',
    'about:blank'
  ]);

  // Wait for DevTools port to open
  await new Promise(r => setTimeout(r, 1200));

  function getVersion() {
    return new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}/json/version`, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });
  }

  const version = await getVersion();
  console.log('Chrome Debugger WebSocket URL:', version.webSocketDebuggerUrl);

  const ws = new WebSocket(version.webSocketDebuggerUrl);

  let id = 1;
  const callbacks = new Map();

  ws.addEventListener('message', event => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      const cb = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      cb(msg);
    }
  });

  await new Promise(r => ws.addEventListener('open', r, { once: true }));

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const reqId = id++;
      callbacks.set(reqId, resolve);
      ws.send(JSON.stringify({ id: reqId, method, params }));
    });
  }

  // Create new target for localhost:3000
  const target = await send('Target.createTarget', { url: 'http://localhost:3000/' });
  const targetId = target.result.targetId;
  const session = await send('Target.attachToTarget', { targetId, flatten: true });
  const sessionId = session.result.sessionId;

  function sendSession(method, params = {}) {
    return new Promise((resolve) => {
      const reqId = id++;
      callbacks.set(reqId, resolve);
      ws.send(JSON.stringify({ id: reqId, sessionId, method, params }));
    });
  }

  console.log('Navigating to http://localhost:3000/ ...');
  await sendSession('Page.enable');
  await sendSession('Runtime.enable');

  // Wait for load
  await new Promise(r => setTimeout(r, 2000));

  // Check stops and actor
  const checkRes = await sendSession('Runtime.evaluate', {
    expression: `(() => {
      const stops = Array.from(document.querySelectorAll('.pup-stop')).map(el => ({
        pose: el.dataset.pose,
        act: el.dataset.act,
        behind: el.dataset.behind,
        w: el.getBoundingClientRect().width,
        h: el.getBoundingClientRect().height,
        top: el.getBoundingClientRect().top + window.scrollY
      }));
      const actor = document.querySelector('.pup-actor');
      const layer = document.querySelector('.pup-layer');
      return {
        stopsCount: stops.length,
        stops,
        hasActor: !!actor,
        actorTransform: actor?.style?.transform,
        layerFront: layer?.dataset?.front,
        bodyScale: document.querySelector('.pup-actor__body')?.style?.transform
      };
    })()`,
    returnByValue: true
  });

  // Check holds from the engine directly
  const holdsRes = await sendSession('Runtime.evaluate', {
    expression: `(() => {
      // Find stops and inspect holds
      const stops = Array.from(document.querySelectorAll('.pup-stop')).map((el, i) => {
        const r = el.getBoundingClientRect();
        return { i, pose: el.dataset.pose, act: el.dataset.act, top: r.top + window.scrollY, left: r.left, w: r.width };
      });
      return {
        maxScroll: document.documentElement.scrollHeight - window.innerHeight,
        stops
      };
    })()`,
    returnByValue: true
  });
  console.log('DOM stops analysis:', JSON.stringify(holdsRes.result.result.value, null, 2));

  // Scroll tests all the way to footer basket
  const scrollPositions = [0, 1800, 5840, 6600, 8046, 9818, 10340, 11203, 11820];
  const states = [];

  for (const sy of scrollPositions) {
    await sendSession('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${sy});`
    });
    await new Promise(r => setTimeout(r, 400));

    const evalRes = await sendSession('Runtime.evaluate', {
      expression: `(() => {
        const actor = document.querySelector('.pup-actor');
        const layer = document.querySelector('.pup-layer');
        const body = document.querySelector('.pup-actor__body');
        return {
          scrollY: window.scrollY,
          transform: actor?.style?.transform,
          layerFront: layer?.dataset?.front,
          isHolding: actor?.dataset?.holding,
          scale: body?.style?.transform
        };
      })()`,
      returnByValue: true
    });
    states.push(evalRes.result?.result?.value);
  }

  // Capture screenshots at key scenes
  fs.mkdirSync('scripts/motion_qa', { recursive: true });

  const capturePoints = [
    { name: 'scene1_hero_quilt', y: 0 },
    { name: 'scene2_meet_hallway', y: 1800 },
    { name: 'scene3_ways_fork', y: 5840 },
    { name: 'scene4_whatsapp_chat', y: 6600 },
    { name: 'scene5_passport_book', y: 8046 },
    { name: 'scene6_dusk_doorway', y: 9818 },
    { name: 'scene7_night_tilt', y: 10340 },
    { name: 'scene8_house_bow', y: 10750 },
    { name: 'scene9_footer_basket', y: 11424 }
  ];

  for (const pt of capturePoints) {
    await sendSession('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${pt.y});`
    });
    await new Promise(r => setTimeout(r, 450));

    const shotRes = await sendSession('Page.captureScreenshot', { format: 'png' });
    if (shotRes.result?.data) {
      fs.writeFileSync(`scripts/motion_qa/${pt.name}.png`, Buffer.from(shotRes.result.data, 'base64'));
      console.log(`Saved screenshot: scripts/motion_qa/${pt.name}.png`);
    }
  }

  // Cleanup
  ws.close();
  chromeProc.kill();
}

testHeadless().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
