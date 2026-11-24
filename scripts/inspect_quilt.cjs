const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_home_main.html', 'utf8');

const quiltMatch = html.match(/<div[^>]*class="tp-quilt"[^>]*>([\s\S]*?)<\/div>/);
if (quiltMatch) {
  console.log('=== TP-QUILT ===');
  console.log(quiltMatch[0]);
}
