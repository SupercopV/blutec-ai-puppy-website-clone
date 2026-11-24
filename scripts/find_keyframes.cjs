const fs = require('fs');

const css = fs.readFileSync('src/styles/original.css', 'utf8');

const kfs = [...css.matchAll(/@keyframes\s+([a-zA-Z0-9_-]+)/g)].map(m => m[1]);
console.log('Keyframes in original.css:');
console.log([...new Set(kfs)]);
