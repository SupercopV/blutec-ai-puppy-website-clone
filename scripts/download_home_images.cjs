const fs = require('fs');
const https = require('https');
const path = require('path');

const missing = JSON.parse(fs.readFileSync('scripts/missing_home_images.json', 'utf8'));

function downloadFile(urlPath) {
  return new Promise((resolve, reject) => {
    const fullUrl = `https://puppy.instabizweb.com${urlPath}`;
    const destPath = path.join('public', urlPath);
    const destDir = path.dirname(destPath);
    
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const file = fs.createWriteStream(destPath);
    https.get(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`[OK] ${urlPath}`);
            resolve(true);
          });
        });
      } else {
        file.close();
        fs.unlink(destPath, () => {});
        console.error(`[FAIL ${res.statusCode}] ${urlPath}`);
        resolve(false);
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(destPath, () => {});
      console.error(`[ERR] ${urlPath}: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  console.log(`Starting download of ${missing.length} missing home images...`);
  for (const urlPath of missing) {
    await downloadFile(urlPath);
  }
  console.log('All downloads finished.');
}

run();
