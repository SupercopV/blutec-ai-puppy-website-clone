const fs = require('fs');
const html = fs.readFileSync('scraped_pages/home.html', 'utf8');

const regex = /<div[^>]*data-pup-stop="true"[^>]*>/g;
let match;
while ((match = regex.exec(html)) !== null) {
  const start = match.index;
  const tag = match[0];
  const slice = html.substring(start, start + 300);
  console.log('--- FOUND STOP ---');
  console.log(tag);
  console.log('Next 150 chars:', slice.substring(tag.length, tag.length + 150));
}

const pupAny = html.match(/class="[^"]*pup-[^"]*"/g);
console.log('All pup- classes:', [...new Set(pupAny)]);
