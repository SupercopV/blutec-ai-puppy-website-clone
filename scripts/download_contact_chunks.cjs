const fs = require('fs');
const https = require('https');
const path = require('path');

const chunks = [
  '1jb_fwgazaoni.js',
  '3oou8raeyuv9d.js',
  '3umdxiosfhr4i.js',
  '2pig6dvmm0b07.js',
  '13ebhwe8d-mme.js',
  '2-rfe7f68bjl5.js',
  '1llon2cx5n3pm.js',
  '3n_i7_kd-icfu.js',
  '31atla-pvue69.js',
  '14uqkrigpurrq.js',
  '177ya708_1zuj.js',
  '04u0_mknmf3rz.js',
  '1cuytp2cyhxp8.js',
  '0-as3adn0ic8o.js',
  '0cz1d0mv5g_q7.js'
];

async function download(chunk) {
  const dest = path.join('scripts/chunks', chunk);
  if (fs.existsSync(dest)) return;
  const url = `https://puppy.instabizweb.com/_next/static/chunks/${chunk}`;
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        fs.writeFileSync(dest, data);
        console.log(`Downloaded ${chunk} (${data.length} bytes)`);
        resolve();
      });
    }).on('error', (e) => {
      console.log(`Error ${chunk}:`, e.message);
      resolve();
    });
  });
}

async function main() {
  fs.mkdirSync('scripts/chunks', { recursive: true });
  for (const c of chunks) {
    await download(c);
  }
}
main();
