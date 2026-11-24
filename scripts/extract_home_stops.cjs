const fs = require('fs');
const html = fs.readFileSync('scraped_pages/home.html', 'utf8');

const regex = /<div[^>]*class="[^"]*pup-stop[^"]*"[^>]*>/g;
let m;
let i = 0;
while ((m = regex.exec(html)) !== null) {
  i++;
  console.log(`=== PUP STOP ${i} ===`);
  const start = Math.max(0, m.index - 100);
  const end = Math.min(html.length, m.index + 250);
  console.log(html.substring(start, end));
}
