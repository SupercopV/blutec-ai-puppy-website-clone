const fs = require('fs');
const path = require('path');

// Check if any js files exist in scraped_pages or project
function findFiles(dir, filter) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        results = results.concat(findFiles(full, filter));
      }
    } else if (filter(file)) {
      results.push(full);
    }
  });
  return results;
}

const jsFiles = findFiles('.', f => f.endsWith('.js') || f.endsWith('.jsx'));
console.log('JS/JSX files found:', jsFiles.length);

// Also search in scraped_pages/home.html for the exact script contents or inline code
const html = fs.readFileSync('scraped_pages/home.html', 'utf8');
const inlines = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
console.log('Inline scripts count:', inlines.length);
inlines.forEach((s, idx) => {
  if (s[1].includes('pup') || s[1].includes('actor') || s[1].includes('scroll')) {
    console.log(`Inline script #${idx} matches pup/actor:`, s[1].slice(0, 200));
  }
});
