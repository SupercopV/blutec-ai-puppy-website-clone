const fs = require('fs');
const path = require('path');

const dusk = JSON.parse(fs.readFileSync('scripts/home_dusk_data.json', 'utf8'));
dusk.forEach((item, idx) => {
  const localPath = path.join('public', item.img);
  const exists = fs.existsSync(localPath);
  console.log(`[${idx + 1}] ${item.caption} -> ${item.img} (exists: ${exists})`);
});
