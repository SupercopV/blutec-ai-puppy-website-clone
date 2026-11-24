const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_puppies.html', 'utf8');

const selfIdx = html.indexOf('tp-sketchbook__self');
console.log('=== AROUND SELF-PORTRAIT ===');
if (selfIdx !== -1) {
  console.log(html.substring(selfIdx, selfIdx + 2500));
}
