const fs = require('fs');

const html = fs.readFileSync('scraped_pages/puppies.html', 'utf8');

// Find the first tp-sketch
const match = html.match(/<a class="tp-sketch"[\s\S]*?<\/a>/);
if (match) {
  fs.writeFileSync('scripts/sketch_sample.html', match[0], 'utf8');
  console.log('Saved scripts/sketch_sample.html');
}
