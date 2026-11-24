const fs = require('fs');
const https = require('https');
const path = require('path');

const css = fs.readFileSync('scripts/how_it_works_bundle.css', 'utf8');
const woffMatches = [...css.matchAll(/url\(([^)]+\.woff2)\)/g)].map(m => m[1]);
console.log('Found woff2 files in bundle:', woffMatches.length);

const unique = [...new Set(woffMatches)];
console.log('Unique woff2 files:', unique);

function download(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) return resolve('exists');

    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error('Status ' + res.statusCode));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve('downloaded'); });
    }).on('error', err => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function run() {
  fs.mkdirSync('public/fonts', { recursive: true });
  for (const item of unique) {
    const filename = path.basename(item);
    // In bundle it was url(../media/filename) where bundle is at /_next/static/chunks/
    // so URL on live site is https://puppy.instabizweb.com/_next/static/media/filename
    const url = `https://puppy.instabizweb.com/_next/static/media/${filename}`;
    const dest = path.join('public/fonts', filename);
    try {
      console.log('Downloading:', filename);
      await download(url, dest);
      console.log('Success:', filename);
    } catch (e) {
      console.error('Failed:', filename, e.message);
    }
  }
}

run();
