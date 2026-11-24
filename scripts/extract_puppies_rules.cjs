const fs = require('fs');
const css = fs.readFileSync('scripts/how_it_works_bundle.css', 'utf8');

const targets = [
  'tp-sketchbook',
  'tp-sketches',
  'tp-sketch',
  'tp-gone-strip'
];

const matched = [];

targets.forEach(t => {
  let pos = 0;
  while ((pos = css.indexOf('.' + t, pos)) !== -1) {
    let start = css.lastIndexOf('}', pos);
    if (start === -1) start = 0; else start += 1;
    let brace = 0;
    let end = pos;
    let started = false;
    while (end < css.length) {
      if (css[end] === '{') { brace++; started = true; }
      else if (css[end] === '}') {
        brace--;
        if (started && brace === 0) { end++; break; }
      }
      end++;
    }
    const rule = css.substring(start, end).trim();
    if (!matched.includes(rule)) matched.push(rule);
    pos = end;
  }
});

console.log('Matched rules count:', matched.length);
fs.writeFileSync('scripts/extracted_puppies_rules.css', matched.join('\n\n'));
console.log('Saved to scripts/extracted_puppies_rules.css');
