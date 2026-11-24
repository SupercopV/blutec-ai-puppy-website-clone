const fs = require('fs');
const https = require('https');
const path = require('path');

const data = JSON.parse(fs.readFileSync('src/data/happyFamiliesData.json', 'utf8'));

function download(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      return resolve('exists');
    }

    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error(`Status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve('downloaded');
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting download of ${data.length} images...`);
  let success = 0;
  let fail = 0;

  // Process in batches of 5
  for (let i = 0; i < data.length; i += 5) {
    const batch = data.slice(i, i + 5);
    await Promise.all(batch.map(async (item) => {
      const url = `https://puppy.instabizweb.com${item.img}`;
      const dest = path.join('public', item.img);
      try {
        await download(url, dest);
        success++;
      } catch (e) {
        console.error(`Failed ${item.img}:`, e.message);
        fail++;
      }
    }));
    process.stdout.write(`Downloaded ${success}/${data.length}...\r`);
  }

  console.log(`\nCompleted! Success: ${success}, Failed: ${fail}`);
}

run();
