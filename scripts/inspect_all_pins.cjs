const fs = require('fs');
const html = fs.readFileSync('scraped_pages/home.html', 'utf8');

let pos = 0;
while (true) {
  const idx = html.indexOf('data-pin-range="true"', pos);
  if (idx === -1) break;
  console.log('Pin range at:', idx);
  console.log(html.substring(Math.max(0, idx - 100), Math.min(html.length, idx + 200)));
  pos = idx + 21;
}
