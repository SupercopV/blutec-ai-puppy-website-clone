const fs = require('fs');
const content = fs.readFileSync('scripts/extracted_client_chunk.js', 'utf8');

const chatIdx = content.indexOf('tp-chat');
const start = content.lastIndexOf('function', chatIdx);
let end = content.indexOf('cuePup', chatIdx);
if (end === -1) end = start + 5000;

console.log(content.substring(start, end));
