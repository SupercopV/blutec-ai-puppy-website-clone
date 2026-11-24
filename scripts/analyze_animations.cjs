const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('scraped_pages');
console.log('=== DATA ATTRIBUTES ACROSS PAGES ===');
files.forEach(f => {
  if (f.endsWith('.html')) {
    const content = fs.readFileSync(path.join('scraped_pages', f), 'utf8');
    const reveals = (content.match(/data-reveal/g) || []).length;
    const armed = (content.match(/data-armed/g) || []).length;
    const revealed = (content.match(/data-revealed/g) || []).length;
    const runner = (content.match(/tp-runner/g) || []).length;
    const curtain = (content.match(/tp-curtain/g) || []).length;
    console.log(`${f}: reveals=${reveals}, armed=${armed}, revealed=${revealed}, runner=${runner}, curtain=${curtain}`);
  }
});

console.log('\n=== CSS ANIMATION KEYFRAMES ===');
const css = fs.readFileSync('src/styles/original.css', 'utf8');
const keyframes = [...css.matchAll(/@keyframes\s+([a-zA-Z0-9_-]+)/g)].map(m => m[1]);
console.log('Keyframes found (' + keyframes.length + '):', [...new Set(keyframes)].join(', '));
