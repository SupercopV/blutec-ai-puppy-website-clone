const fs = require('fs');

const footer = fs.readFileSync('scripts/extracted_footer.html', 'utf8');

// Find moon in footer
const moonIdx = footer.indexOf('tp-footer__moon') !== -1 ? footer.indexOf('tp-footer__moon') : footer.indexOf('moon');
console.log('moonIdx:', moonIdx);
if (moonIdx !== -1) {
  console.log(footer.substring(moonIdx - 50, moonIdx + 400));
} else {
  // search for path or svg in sky
  const skyIdx = footer.indexOf('pointer-events-none absolute inset-x-0 top-6');
  console.log('Sky section:', footer.substring(skyIdx, skyIdx + 2000));
}

// Find basket in footer
const basketIdx = footer.indexOf('tp-basket');
if (basketIdx !== -1) {
  console.log('=== BASKET SECTION ===');
  console.log(footer.substring(basketIdx - 50, basketIdx + 2500));
}
