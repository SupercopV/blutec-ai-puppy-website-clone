const fs = require('fs');

const html = fs.readFileSync('scraped_pages/home.html', 'utf8');

// Find occurrences of pup-layer, pup-actor, pup-prints
const matches = [...html.matchAll(/(pup-[a-z_-]+)/g)];
console.log('Unique pup tokens in home.html:');
const unique = [...new Set(matches.map(m => m[1]))];
console.log(unique);

// Search for any script containing pup-layer or pup-actor
const scripts = [...html.matchAll(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/g)];
console.log('Found chunks count:', scripts.length);

scripts.forEach(s => {
  console.log('Chunk:', s[1]);
});
