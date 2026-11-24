const fs = require('fs');

const html = fs.readFileSync('scraped_pages/puppies.html', 'utf8');

// Find what contains the list of tp-sketch
const idx = html.indexOf('<a class="tp-sketch"');
if (idx !== -1) {
  console.log(html.substring(idx - 250, idx + 80));
}
