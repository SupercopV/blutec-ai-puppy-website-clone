const fs = require('fs');

const css = fs.readFileSync('src/styles/original.css', 'utf8');

// Find all CSS rules for tp-phone, tp-chat, tp-msg, tp-typing
const chatRules = [...css.matchAll(/(\.(?:tp-phone|tp-chat|tp-msg|tp-typing|tp-route|tp-clip|tp-snap)[^{]*\{[^}]+\})/g)];
console.log('Total chat CSS rules:', chatRules.length);
chatRules.forEach(r => console.log(r[1]));
