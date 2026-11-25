const fs = require('fs');
const html = fs.readFileSync('scripts/extracted_contact.html', 'utf8');

const regex = /\/_next\/static\/chunks\/[^"']+/g;
const matches = [...new Set(html.match(regex) || [])];
console.log('Contact chunk files:', matches);
