const fs = require('fs');

const html = fs.readFileSync('scraped_pages/puppies.html', 'utf8');

const start = html.indexOf('<div class="pup-buddy');
const end = html.indexOf('</div>', html.indexOf('</svg>', start));
console.log(html.substring(start, end + 6));
fs.writeFileSync('scripts/pup_buddy.html', html.substring(start, end + 6), 'utf8');
