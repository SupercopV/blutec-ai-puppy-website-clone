const fs = require('fs');
const content = fs.readFileSync('scripts/chunks/1wa3jfz4v5w2v.js', 'utf8');

// Find the functions
fs.writeFileSync('scripts/extracted_client_chunk.js', content);
console.log('Total length:', content.length);

// Search for Chat component
const chatIdx = content.indexOf('tp-chat');
console.log('chatIdx:', chatIdx);
if (chatIdx !== -1) {
  const start = content.lastIndexOf('function', chatIdx);
  console.log('--- CHAT COMPONENT ---');
  console.log(content.substring(start, start + 3000));
}

// Search for PupJourney component
const pupIdx = content.indexOf('pup-layer');
console.log('pupIdx:', pupIdx);
if (pupIdx !== -1) {
  const start = content.lastIndexOf('function', pupIdx);
  console.log('--- PUP COMPONENT ---');
  console.log(content.substring(start, start + 4000));
}
