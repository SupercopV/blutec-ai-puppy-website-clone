const fs = require('fs');

const html = fs.readFileSync('scraped_pages/home.html', 'utf8');

const meetIdx = html.indexOf('tp-meet__track');
const endMeet = html.indexOf('</ol>', meetIdx);
console.log(html.substring(endMeet - 600, endMeet + 10));
