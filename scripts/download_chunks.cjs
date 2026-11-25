const fs = require('fs');
const https = require('https');
const path = require('path');

const chunks = [
  '3oou8raeyuv9d.js',
  '3umdxiosfhr4i.js',
  '2pig6dvmm0b07.js',
  '13ebhwe8d-mme.js',
  'turbopack-2c3mg3r-05n1w.js',
  '2-rfe7f68bjl5.js',
  '1llon2cx5n3pm.js',
  '3n_i7_kd-icfu.js',
  '31atla-pvue69.js',
  '14uqkrigpurrq.js',
  '177ya708_1zuj.js',
  '04u0_mknmf3rz.js',
  '3gnj9-_12x8lt.js',
  '1wa3jfz4v5w2v.js',
  '1zehnmtvp861v.js',
  '0-as3adn0ic8o.js',
  '0cz1d0mv5g_q7.js',
  '1jb_fwgazaoni.js'
];

if (!fs.existsSync('scripts/chunks')) fs.mkdirSync('scripts/chunks');

async function downloadChunk(name) {
  const filePath = path.join('scripts/chunks', name);
  if (fs.existsSync(filePath)) return;
  const url = `https://puppy.instabizweb.com/_next/static/chunks/${name}`;
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else {
        resolve();
      }
    }).on('error', () => resolve());
  });
}

(async () => {
  console.log('Downloading chunks...');
  for (const c of chunks) {
    await downloadChunk(c);
  }
  console.log('Finished downloading chunks. Searching for Chat / PupJourney...');
  const files = fs.readdirSync('scripts/chunks');
  for (const file of files) {
    const content = fs.readFileSync(path.join('scripts/chunks', file), 'utf8');
    if (content.includes('tp-chat__step') || content.includes('data-pup-stop') || content.includes('pup-actor')) {
      console.log('Match in chunk:', file);
      const idx = content.indexOf('tp-chat__step');
      if (idx !== -1) {
        console.log('tp-chat snippet:', content.substring(Math.max(0, idx - 100), idx + 400));
      }
      const idx2 = content.indexOf('pup-actor');
      if (idx2 !== -1) {
        console.log('pup-actor snippet:', content.substring(Math.max(0, idx2 - 100), idx2 + 400));
      }
    }
  }
})();
