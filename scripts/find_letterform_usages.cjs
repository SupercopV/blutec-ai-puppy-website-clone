const fs = require('fs');
const html = fs.readFileSync('scripts/extracted_contact.html', 'utf8');

let idx = 0;
while ((idx = html.indexOf('LetterForm', idx)) !== -1) {
  console.log('Match at', idx);
  console.log(html.substring(Math.max(0, idx - 50), idx + 400));
  idx += 10;
}
