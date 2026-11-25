const fs = require('fs');
const html = fs.readFileSync('scripts/extracted_contact.html', 'utf8');

const regex = /"heading":"([^"]+)","body":"([^"]+)"/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log('Heading:', m[1]);
  console.log('Body:', m[2]);
}
