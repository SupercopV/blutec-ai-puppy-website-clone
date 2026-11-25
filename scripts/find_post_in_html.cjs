const fs = require('fs');
const html = fs.readFileSync('scripts/extracted_contact.html', 'utf8');

const idx = html.indexOf('tp-post');
console.log('tp-post index:', idx);
console.log(html.substring(idx - 100, idx + 1200));
