const fs = require('fs');

const code = fs.readFileSync('scripts/pup_animation_chunk.js', 'utf8');

const matches = [...code.matchAll(/cuePup\s*\(([^)]*)\)/g)];
console.log('cuePup calls:', matches.length);
matches.forEach(m => console.log(m[0]));

// Let's also search for 'say:'
const sayMatches = [...code.matchAll(/say:\s*([^,}]+)/g)];
console.log('Say phrases:', sayMatches.length);
sayMatches.forEach(m => console.log(m[0]));
