const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_puppies.html', 'utf8');

const goneStart = html.indexOf('tp-gone-strip');
if (goneStart !== -1) {
  const goneEnd = html.indexOf('</section>', goneStart);
  const snippet = html.substring(goneStart, goneEnd);
  console.log('=== GONE STRIP CONTENT ===');
  console.log(snippet.substring(0, 2000));

  // Extract names and breeds
  const names = [...snippet.matchAll(/class="tp-sketch__name font-plush"[^>]*>([\s\S]*?)<\/span>/g)].map(m => m[1].trim());
  console.log('\nGONE PUPPY NAMES:', names);
}
