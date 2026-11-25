const fs = require('fs');
const html = fs.readFileSync('scraped_pages/home.html', 'utf8');

const scripts = html.match(/src="([^"]+\.js)"/g);
console.log('Script tags:', scripts);
