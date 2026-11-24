const fs = require('fs');

const html = fs.readFileSync('scraped_pages/happy-families.html', 'utf8');

const mainStart = html.indexOf('<main');
const mainEnd = html.indexOf('</main>');

if (mainStart !== -1 && mainEnd !== -1) {
  const main = html.substring(mainStart, mainEnd + 7);
  console.log('MAIN LENGTH:', main.length);
  fs.writeFileSync('scripts/extracted_happy_families.html', main);
  console.log('Saved to scripts/extracted_happy_families.html');

  // Headings
  const headings = main.match(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/g) || [];
  console.log('\nHEADINGS (' + headings.length + '):');
  headings.forEach(h => console.log('  ', h.replace(/<[^>]+>/g, '').trim()));

  // Look for sections
  const sections = main.match(/<section[^>]*>/g) || [];
  console.log('\nSECTIONS (' + sections.length + '):');
  sections.forEach(s => console.log('  ', s));

  // Look for buttons or interactive filters
  const buttons = main.match(/<button[^>]*>[\s\S]*?<\/button>/g) || [];
  console.log('\nBUTTONS (' + buttons.length + '):');
  buttons.slice(0, 10).forEach(b => console.log('  ', b.replace(/<[^>]+>/g, '').trim(), b.substring(0, 80)));

  // Look for pup-buddy mascot occurrences
  const buddies = main.match(/<div[^>]*class="[^"]*pup-buddy[^"]*"[^>]*>/g) || [];
  console.log('\nPUP-BUDDY count:', buddies.length);
  buddies.forEach(b => console.log('  ', b));

  // Look for classes starting with tp-
  const tpClasses = new Set();
  const classMatches = main.matchAll(/class="([^"]*)"/g);
  for (const m of classMatches) {
    m[1].split(/\s+/).forEach(c => {
      if (c.startsWith('tp-')) tpClasses.add(c);
    });
  }
  console.log('\nTP CLASSES:', Array.from(tpClasses));

  // Count items/polaroids
  const items = main.match(/<li[^>]*>/g) || [];
  console.log('\nLI elements count:', items.length);

  // Extract first 2 item HTML snippets
  const ulStart = main.indexOf('<ul');
  if (ulStart !== -1) {
    console.log('\nFIRST 1000 CHARS OF UL:\n', main.substring(ulStart, ulStart + 1000));
  }
} else {
  console.log('Main tag not found in scraped_pages/happy-families.html');
}
