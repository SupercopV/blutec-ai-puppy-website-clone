const fs = require('fs');
const content = fs.readFileSync('scripts/extracted_client_chunk.js', 'utf8');

const idx = content.indexOf('Meet",0,function');
console.log('Meet function index:', idx);
if (idx !== -1) {
  console.log(content.substring(idx, idx + 4000));
}
