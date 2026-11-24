const fs = require('fs');

const css = fs.readFileSync('src/styles/original.css', 'utf8');

const regex = /([^{}]+)\{([^{}]+)\}/g;
let match;
const revealRules = [];
while ((match = regex.exec(css)) !== null) {
  const sel = match[1];
  const body = match[2];
  if (sel.includes('data-armed') || sel.includes('data-revealed') || sel.includes('data-reveal')) {
    revealRules.push({ sel: sel.trim(), body: body.trim() });
  }
}

console.log('Total reveal rules found:', revealRules.length);
revealRules.forEach((r, i) => {
  console.log(`${i + 1}: ${r.sel}`);
  console.log(`   -> ${r.body}`);
});
