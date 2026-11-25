const fs = require('fs');
const html = fs.readFileSync('scripts/extracted_contact.html', 'utf8');

const regex = /\[\"\\$\",\"\$L37\",[^\]]+\]/g;
const matches = html.match(regex);
console.log('Matches:', matches);

const idx = html.indexOf('$L37');
console.log('$L37 index:', idx);
if (idx !== -1) {
  console.log(html.substring(idx - 50, idx + 800));
}
