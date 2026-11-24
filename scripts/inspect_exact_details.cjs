const fs = require('fs');

const header = fs.readFileSync('scripts/extracted_header.html', 'utf8');

// Find scallop or edge in header
console.log('=== HEADER SCALLOP / EDGES ===');
const scallopMatch = header.match(/<svg[^>]*tp-header__edge[^>]*>[\s\S]*?<\/svg>/i) || header.match(/<svg[^>]*scallop[^>]*>[\s\S]*?<\/svg>/i);
if (scallopMatch) {
  console.log(scallopMatch[0]);
} else {
  // Check the end of header
  console.log(header.slice(-1000));
}

// Find footer basket and moon
const footer = fs.readFileSync('scripts/extracted_footer.html', 'utf8');
console.log('=== FOOTER MOON & BASKET ===');
const moonMatch = footer.match(/<svg[^>]*moon[^>]*>[\s\S]*?<\/svg>/i) || footer.match(/crescent/i);
const basketMatch = footer.indexOf('tp-basket');
if (basketMatch !== -1) {
  console.log(footer.substring(basketMatch - 50, basketMatch + 800));
}

// Check puppies.html filter pad
const pupsHtml = fs.readFileSync('scraped_pages/puppies.html', 'utf8');
const filterStart = pupsHtml.indexOf('tp-sketchpad');
if (filterStart !== -1) {
  console.log('=== PUPPIES FILTER NOTEPAD ===');
  console.log(pupsHtml.substring(filterStart - 50, filterStart + 1800));
}
