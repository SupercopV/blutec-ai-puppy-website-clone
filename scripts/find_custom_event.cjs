const fs = require('fs');

const code = fs.readFileSync('scripts/pup_animation_chunk.js', 'utf8');

const eventIdx = code.indexOf('CustomEvent');
if (eventIdx !== -1) {
  console.log('Around CustomEvent:');
  console.log(code.slice(Math.max(0, eventIdx - 500), eventIdx + 800));
}
