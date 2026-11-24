const fs = require('fs');
const html = fs.readFileSync('scraped_pages/faq.html', 'utf8');

const idx = html.indexOf('</aside>');
console.log(html.substring(idx, idx + 1000));
