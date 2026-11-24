const fs = require('fs');

const html = fs.readFileSync('scraped_pages/how-it-works.html', 'utf8');

const mainStart = html.indexOf('<main');
const mainEnd = html.indexOf('</main>');

if (mainStart !== -1 && mainEnd !== -1) {
  const main = html.substring(mainStart, mainEnd + 7);
  console.log('MAIN LENGTH:', main.length);
  fs.writeFileSync('scripts/extracted_how_it_works.html', main);
  console.log('Saved to scripts/extracted_how_it_works.html');

  // Find headings
  const headings = main.match(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/g) || [];
  console.log('HEADINGS (' + headings.length + '):');
  headings.forEach(h => console.log('  ', h.replace(/<[^>]+>/g, '').trim()));

  // Find section classes
  const sections = main.match(/<section[^>]*class="[^"]*"[^>]*>/g) || [];
  console.log('SECTIONS (' + sections.length + '):');
  sections.forEach(s => console.log('  ', s));
} else {
  console.log('Main not found');
}
