const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_puppies.html', 'utf8');

// 1. Header snippet
const headEnd = html.indexOf('<div class="tp-pad"');
const padStart = html.indexOf('class="tp-pad"');
console.log('=== HEADER & PAD ===');
if (padStart !== -1) {
  console.log(html.substring(0, padStart + 500));
} else {
  console.log(html.substring(0, 1500));
}

// 2. Find filter bar elements
const filters = html.match(/<button[^>]+role="tab"[^>]*>[\s\S]*?<\/button>|<button[^>]+aria-pressed[^>]*>[\s\S]*?<\/button>/gi) || [];
console.log('\n=== FILTERS FOUND ===', filters.length);
filters.slice(0, 15).forEach(f => console.log('  ', f));

// 3. Find card structure
const cardStart = html.indexOf('class="tp-sketch"');
if (cardStart !== -1) {
  console.log('\n=== FIRST CARD SNIPPET ===');
  console.log(html.substring(cardStart - 50, cardStart + 1200));
}

// 4. Check "Already gone home" section
const goneStart = html.indexOf('tp-gone-strip');
if (goneStart !== -1) {
  console.log('\n=== GONE STRIP SNIPPET ===');
  console.log(html.substring(goneStart - 50, goneStart + 1000));
}
