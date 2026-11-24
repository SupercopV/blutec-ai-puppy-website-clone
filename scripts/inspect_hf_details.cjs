const fs = require('fs');

const main = fs.readFileSync('scripts/extracted_happy_families.html', 'utf8');

// Header
const headEnd = main.indexOf('<ul class="tp-wall"');
console.log('=== HEADER ===');
console.log(main.substring(0, headEnd));

// Footer
const footStart = main.indexOf('<div class="tp-memories__foot"');
if (footStart !== -1) {
  console.log('=== FOOTER ===');
  console.log(main.substring(footStart));
} else {
  console.log('tp-memories__foot not found directly, showing last 1000 chars:');
  console.log(main.substring(main.length - 1000));
}

// Inspect image URLs from polaroids
const imgMatches = [...main.matchAll(/srcSet="([^"]+)"|src="([^"]+)"/g)];
const urls = new Set();
imgMatches.forEach(m => {
  const match = m[1] || m[2];
  if (match.includes('url=')) {
    const dec = decodeURIComponent(match.split('url=')[1].split('&')[0]);
    urls.add(dec);
  } else if (!match.startsWith('data:')) {
    urls.add(match);
  }
});
console.log('\nTOTAL IMAGE URLS:', urls.size);
console.log('Sample image URLs:', Array.from(urls).slice(0, 10));
