const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_phone_markup.html', 'utf8');

const classes = [...html.matchAll(/class="([^"]*)"/g)].map(m => m[1]);
console.log('Unique classes in phone markup:');
console.log([...new Set(classes)]);
