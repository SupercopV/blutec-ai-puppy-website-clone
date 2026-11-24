const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_home_main.html', 'utf8');

// Find all section tags and their headings
const sections = [...html.matchAll(/<section\b([^>]*)>([\s\S]*?)<\/section>/g)];
console.log('Total sections in <main>:', sections.length);

sections.forEach((sec, idx) => {
  const attrs = sec[1];
  const body = sec[2];
  
  const classMatch = attrs.match(/class="([^"]*)"/);
  const idMatch = attrs.match(/id="([^"]*)"/);
  const ariaMatch = attrs.match(/aria-labelledby="([^"]*)"/);
  const hMatch = body.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/);

  console.log(`\n================== SECTION ${idx + 1} ==================`);
  console.log('Class:', classMatch ? classMatch[1] : 'none');
  console.log('Heading:', hMatch ? hMatch[1].replace(/<[^>]+>/g, '').trim() : 'none');
  console.log('Section length:', body.length);
});
