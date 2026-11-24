const fs = require('fs');

const code = fs.readFileSync('scripts/pup_animation_chunk.js', 'utf8');

// Search for paw print path (starts with M or similar path string)
const pawMatch = code.match(/viewBox:"0 0 64 64"[\s\S]*?d:"([^"]+)"/);
if (pawMatch) {
  console.log('Paw path:', pawMatch[1]);
} else {
  // search for path starting with M32 or similar in the chunk
  const paths = [...code.matchAll(/d:"(M[0-9. -]+[a-zA-Z0-9. -]+Z)"/g)];
  console.log('Paths found:', paths.length);
  paths.forEach(p => console.log(p[1].slice(0, 80)));
}
