const fs = require('fs');
const content = fs.readFileSync('scripts/extracted_client_chunk.js', 'utf8');

const matches = content.match(/.{0,100}basket.{0,100}/g);
console.log('Basket occurrences in client chunk:');
if (matches) {
  matches.forEach(m => console.log('-->', m));
}
