const fs = require('fs');
const html = fs.readFileSync('scripts/extracted_contact.html', 'utf8');

const idx = html.indexOf('LetterForm');
if (idx !== -1) {
  console.log(html.substring(idx - 100, idx + 600));
} else {
  console.log('Searching for "Dear TeddyPups" in html...');
  const idx2 = html.indexOf('Dear TeddyPups');
  console.log(html.substring(idx2 - 200, idx2 + 200));
}
