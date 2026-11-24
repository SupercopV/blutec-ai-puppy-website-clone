const fs = require('fs');

const html = fs.readFileSync('scraped_pages/puppies.html', 'utf8');

const selfIdx = html.indexOf('tp-sketchbook__self');
if (selfIdx !== -1) {
  console.log('=== TP-SKETCHBOOK__SELF ===');
  console.log(html.substring(selfIdx - 20, selfIdx + 1000));
}
