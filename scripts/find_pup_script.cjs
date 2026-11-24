const fs = require('fs');
const https = require('https');

const html = fs.readFileSync('scraped_pages/home.html', 'utf8');
const scriptMatches = [...html.matchAll(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/g)];
const chunkUrls = [...new Set(scriptMatches.map(m => m[1]))];

async function checkChunk(urlPath) {
  return new Promise((resolve) => {
    https.get(`https://puppy.instabizweb.com${urlPath}`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (data.includes('pup-actor') || data.includes('pup-layer') || data.includes('pup-stop') || data.includes('pup-prints')) {
          console.log(`[FOUND PUP ANIMATION] ${urlPath} (size: ${data.length})`);
          fs.writeFileSync('scripts/pup_animation_chunk.js', data, 'utf8');
          resolve(true);
        } else {
          resolve(false);
        }
      });
    }).on('error', () => resolve(false));
  });
}

async function run() {
  console.log(`Checking ${chunkUrls.length} chunks for pup animation code...`);
  for (const c of chunkUrls) {
    const found = await checkChunk(c);
    if (found) break;
  }
  console.log('Search finished.');
}

run();
