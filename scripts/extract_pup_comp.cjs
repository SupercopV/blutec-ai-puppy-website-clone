const fs = require('fs');

const code = fs.readFileSync('scripts/pup_animation_chunk.js', 'utf8');

// Let's find where the component starts before pup-layer
const layerIdx = code.indexOf('pup-layer');
const start = Math.max(0, layerIdx - 10000);
const end = Math.min(code.length, layerIdx + 2000);

fs.writeFileSync('scripts/pup_animation_extracted.js', code.slice(start, end), 'utf8');
console.log('Saved pup_animation_extracted.js');
