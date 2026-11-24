const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_phone_markup.html', 'utf8');

const bubbles = [...html.matchAll(/<div class="tp-bubble([^"]*)"([^>]*)>([\s\S]*?)<\/div>/g)];
console.log('Bubbles count:', bubbles.length);

bubbles.forEach((b, idx) => {
  console.log(`\nBubble #${idx + 1} (${b[1]}):`);
  console.log(b[3].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
});
