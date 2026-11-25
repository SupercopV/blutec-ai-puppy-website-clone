const fs = require('fs');
const html = fs.readFileSync('scripts/extracted_contact.html', 'utf8');

const idx = html.indexOf('37:I');
console.log('37:I index:', idx);
const idx2 = html.indexOf('$37', idx);
console.log('$37 index:', idx2);
if (idx2 !== -1) {
  console.log(html.substring(idx2 - 100, idx2 + 1000));
}
