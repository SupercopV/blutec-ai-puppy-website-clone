const fs = require('fs');

const html = fs.readFileSync('scraped_pages/happy-families.html', 'utf8');

const wallIdx = html.indexOf('class="tp-wall"');
const photoClose = html.indexOf('</span>', html.indexOf('tp-polaroid__photo', wallIdx));
console.log(html.substring(photoClose, photoClose + 400));
