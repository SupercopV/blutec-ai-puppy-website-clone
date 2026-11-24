const fs = require('fs');
const https = require('https');
const path = require('path');

const images = JSON.parse(fs.readFileSync('scripts/home_images.json', 'utf8'));

const missing = [];
images.forEach(img => {
  if (!img.rawUrl.startsWith('/media/')) return;
  const localPath = path.join('public', img.rawUrl);
  if (!fs.existsSync(localPath)) {
    missing.push(img.rawUrl);
  }
});

const uniqueMissing = [...new Set(missing)];
console.log('Unique missing home images:', uniqueMissing.length);
uniqueMissing.forEach(u => console.log(' - ' + u));

if (uniqueMissing.length > 0) {
  fs.writeFileSync('scripts/missing_home_images.json', JSON.stringify(uniqueMissing, null, 2), 'utf8');
}
