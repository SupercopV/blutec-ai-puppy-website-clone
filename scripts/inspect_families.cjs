const fs = require('fs');

const html = fs.readFileSync('scraped_pages/happy-families.html', 'utf8');

// Find li or item in happy families
const wallIdx = html.indexOf('tp-wall');
if (wallIdx !== -1) {
  console.log('=== TP-WALL IN HAPPY FAMILIES ===');
  console.log(html.substring(wallIdx - 30, wallIdx + 800));
}
