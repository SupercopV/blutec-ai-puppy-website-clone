const fs = require('fs');

const html = fs.readFileSync('scraped_pages/puppies.html', 'utf8');

// Find first <a class="tp-sketch"
const match = html.match(/<a class="tp-sketch\b[^"]*"[^>]*>([\s\S]*?)<\/a>/);
if (match) {
  console.log('=== FULL TP-SKETCH ELEMENT ===');
  console.log(match[0]);
}
