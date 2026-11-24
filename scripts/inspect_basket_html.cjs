const fs = require('fs');

const footer = fs.readFileSync('scripts/extracted_footer.html', 'utf8');

const basketIdx = footer.indexOf('tp-basket');
const basketEnd = footer.indexOf('</div>', footer.indexOf('tp-basket__front', basketIdx));
console.log('=== BASKET HTML ===');
console.log(footer.substring(basketIdx - 40, basketEnd + 500));
