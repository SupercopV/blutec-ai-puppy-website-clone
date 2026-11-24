const fs = require('fs');

const html = fs.readFileSync('scraped_pages/puppies_maltipoo-max-male.html', 'utf8');

const viewerIdx = html.indexOf('tp-viewer');
if (viewerIdx !== -1) {
  console.log('=== TP-VIEWER IN PUPPY DETAIL ===');
  console.log(html.substring(viewerIdx - 20, viewerIdx + 800));
}

const tagIdx = html.indexOf('tp-tag');
if (tagIdx !== -1) {
  console.log('=== TP-TAG IN PUPPY DETAIL ===');
  console.log(html.substring(tagIdx - 20, tagIdx + 800));
}
