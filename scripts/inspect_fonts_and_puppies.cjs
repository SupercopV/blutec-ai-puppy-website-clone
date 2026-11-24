const fs = require('fs');

const html = fs.readFileSync('scraped_pages/puppies.html', 'utf8');

// 1. Inspect Fonts in html
const fontLinks = html.match(/<link[^>]+fonts[^>]*>/gi) || [];
console.log('=== FONT LINKS IN HTML ===');
console.log(fontLinks);

const fontPreloads = html.match(/<link[^>]+rel="preload"[^>]+as="font"[^>]*>/gi) || [];
console.log('=== FONT PRELOADS ===');
console.log(fontPreloads);

// Check CSS bundle for @font-face
const css = fs.readFileSync('scripts/how_it_works_bundle.css', 'utf8');
const fontFaces = css.match(/@font-face\s*\{[^}]+\}/g) || [];
console.log('=== @font-face RULES COUNT ===', fontFaces.length);
fontFaces.forEach((f, i) => console.log(`[${i}]:`, f));

// Check font family CSS variables
const fontVars = css.match(/--font-[^:;]+:[^;]+;/g) || [];
console.log('=== FONT VARIABLES ===');
console.log([...new Set(fontVars)]);

// 2. Extract Main tag
const mainStart = html.indexOf('<main');
const mainEnd = html.indexOf('</main>');
if (mainStart !== -1 && mainEnd !== -1) {
  const main = html.substring(mainStart, mainEnd + 7);
  console.log('\n=== PUPPIES MAIN LENGTH ===', main.length);
  fs.writeFileSync('scripts/extracted_puppies.html', main);
  console.log('Saved to scripts/extracted_puppies.html');

  // Find TP classes
  const tpClasses = new Set();
  const classMatches = main.matchAll(/class="([^"]*)"/g);
  for (const m of classMatches) {
    m[1].split(/\s+/).forEach(c => {
      if (c.startsWith('tp-')) tpClasses.add(c);
    });
  }
  console.log('TP CLASSES:', Array.from(tpClasses));

  // Find headings
  const headings = main.match(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/g) || [];
  console.log('HEADINGS:', headings.map(h => h.replace(/<[^>]+>/g, '').trim()));
}
