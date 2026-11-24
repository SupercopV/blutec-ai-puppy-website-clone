const fs = require('fs');

const html = fs.readFileSync('scraped_pages/home.html', 'utf8');

const wallIdx = html.indexOf('tp-photowall');
if (wallIdx !== -1) {
  console.log('=== TP-PHOTOWALL IN HOME.HTML ===');
  console.log(html.substring(wallIdx - 20, wallIdx + 800));
}
