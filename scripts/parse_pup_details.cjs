const fs = require('fs');

const code = fs.readFileSync('scripts/pup_animation_chunk.js', 'utf8');

// Find all function or variable declarations in the chunk
// In Webpack/Turbopack, modules are defined with IDs or export functions
console.log('Searching for module exports...');
const moduleMatch = code.match(/function\s+([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*\{/g);
console.log('Function signatures:', moduleMatch ? moduleMatch.slice(0, 20) : 'none');

// Let's search for cuePup and CustomEvent
const cueIdx = code.indexOf('cuePup');
if (cueIdx !== -1) {
  console.log('Around cuePup:', code.slice(Math.max(0, cueIdx - 500), cueIdx + 500));
}
