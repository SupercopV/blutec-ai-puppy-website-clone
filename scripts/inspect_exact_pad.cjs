const fs = require('fs');

const html = fs.readFileSync('scraped_pages/puppies.html', 'utf8');

const titleIdx = html.indexOf('from Teddy&#x27;s sketchbook');
const listIdx = html.indexOf('tp-sketches');
console.log('Between title and list:');
console.log(html.substring(titleIdx, listIdx));
