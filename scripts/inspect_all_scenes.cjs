const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_home_main.html', 'utf8');

const sections = [...html.matchAll(/<section\b([^>]*)>([\s\S]*?)<\/section>/g)];

sections.forEach((sec, idx) => {
  const attrs = sec[1];
  const body = sec[2];
  
  const classMatch = attrs.match(/class="([^"]*)"/);
  console.log(`\n================== SECTION ${idx + 1}: ${classMatch ? classMatch[1] : ''} ==================`);
  
  // Extract images
  const imgs = [...body.matchAll(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/g)];
  console.log('Images count:', imgs.length);
  imgs.forEach(i => console.log(`   - alt: "${i[2]}", src: "${i[1].slice(0, 80)}"`));

  // Extract headings
  const headings = [...body.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/g)];
  headings.forEach(h => console.log(`   - H: ${h[1].replace(/<[^>]+>/g, '').trim()}`));

  // Extract pup stops
  const pupStops = [...body.matchAll(/class="[^"]*pup-stop[^"]*"([^>]*)/g)];
  pupStops.forEach(p => console.log(`   - pup-stop attrs: ${p[1]}`));
});
