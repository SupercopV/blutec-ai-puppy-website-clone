const fs = require('fs');
const html = fs.readFileSync('scripts/extracted_contact.html', 'utf8');

const idx = html.indexOf('tp-post', 32000);
console.log('Second tp-post index:', idx);
if (idx !== -1) {
  console.log(html.substring(idx - 100, idx + 800));
}
