const fs = require('fs');
const html = fs.readFileSync('scraped_pages/home.html', 'utf8');

const classNames = [
  'tp-hero__teddy',
  'tp-meet__teddy',
  'tp-fork__teddy',
  'tp-chat__teddy',
  'tp-book__teddy',
  'tp-dusk__teddy',
  'tp-night__teddy',
  'tp-house__teddy'
];

classNames.forEach(cls => {
  const idx = html.indexOf(cls);
  if (idx !== -1) {
    console.log(`\n=== ${cls} ===`);
    const before = html.substring(idx - 150, idx);
    const after = html.substring(idx + cls.length, idx + cls.length + 150);
    console.log('BEFORE:', before);
    console.log('AFTER:', after);
  }
});
