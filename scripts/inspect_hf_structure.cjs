const fs = require('fs');

const header = fs.readFileSync('scripts/extracted_header.html', 'utf8');
console.log('=== HEADER OVERVIEW ===');
console.log(header.slice(0, 1500));

const footer = fs.readFileSync('scripts/extracted_footer.html', 'utf8');
console.log('\n=== FOOTER OVERVIEW ===');
console.log(footer.slice(0, 1500));
