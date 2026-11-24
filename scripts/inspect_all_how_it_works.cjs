const fs = require('fs');
const html = fs.readFileSync('scripts/extracted_how_it_works.html', 'utf8');

function inspectSection(name, startStr, endStr) {
  const start = html.indexOf(startStr);
  const end = endStr ? html.indexOf(endStr, start) : html.length;
  console.log(`\n=================== ${name} ===================`);
  console.log(html.substring(start, Math.min(start + 4000, end)));
}

inspectSection('JOURNEYS PANELS', 'class="tp-journeys__panes"', '<section id="promise"');
inspectSection('PROMISE', '<section id="promise"', '<section id="delivery"');
inspectSection('DELIVERY', '<section id="delivery"', '<section id="why"');
inspectSection('WHY', '<section id="why"', '<section aria-labelledby="care-title"');
inspectSection('CARE / CTA', '<section aria-labelledby="care-title"', '</main>');
