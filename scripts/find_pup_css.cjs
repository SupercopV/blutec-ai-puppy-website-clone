const fs = require('fs');

const css = fs.readFileSync('src/styles/original.css', 'utf8');
const pupRules = [...css.matchAll(/(\.pup-[^{]+\{[^}]+\})/g)];
console.log('Total .pup- rules:', pupRules.length);
pupRules.slice(0, 30).forEach(r => console.log(r[1]));
