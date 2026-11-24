const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_home_main.html', 'utf8');

const tagLineup = html.match(/<ul class="tp-lineup tp-lineup--tags"[^>]*>([\s\S]*?)<\/ul>/);
if (tagLineup) {
  console.log('=== TAG LINEUP ===');
  console.log(tagLineup[1]);
}
