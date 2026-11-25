const fs = require('fs');
const html = fs.readFileSync('scripts/extracted_contact.html', 'utf8');

const idx = html.indexOf('$L37');
console.log(html.substring(idx + 500, idx + 1800));
