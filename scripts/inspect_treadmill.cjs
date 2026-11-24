const fs = require('fs');
const html = fs.readFileSync('scraped_pages/home.html', 'utf8');

const m = html.match(/data-treadmill="[^"]*"/g) || [];
console.log('Treadmill match:', m);

const pinMatches = html.match(/data-pin-range="[^"]*"/g) || [];
console.log('Pin range match:', pinMatches);

const pinnedMatches = html.match(/data-pinned="[^"]*"/g) || [];
console.log('Pinned match:', pinnedMatches);
