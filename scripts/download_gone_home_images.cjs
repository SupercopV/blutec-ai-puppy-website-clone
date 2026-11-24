const fs = require('fs');
const https = require('https');
const path = require('path');

const tickets = JSON.parse(fs.readFileSync('src/data/goneHomeTicketsData.json', 'utf8'));

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
  console.log(`Checking ${tickets.length} ticket images...`);
  let downloaded = 0;
  let exists = 0;

  for (const t of tickets) {
    const dest = path.join('public', t.img);
    const url = `https://puppy.instabizweb.com${t.img}`;
    try {
      const res = await download(url, dest);
      if (res === 'downloaded') downloaded++;
      else exists++;
    } catch (e) {
      console.error(`Failed ${t.name}:`, e.message);
    }
  }

  console.log(`Done! Downloaded: ${downloaded}, Already existed: ${exists}`);
}

run();
