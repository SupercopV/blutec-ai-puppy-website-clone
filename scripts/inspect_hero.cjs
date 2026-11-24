const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_home_main.html', 'utf8');

const s1Match = html.match(/<section[^>]*class="[^"]*tp-hero[^"]*"[^>]*>([\s\S]*?)<\/section>/);
if (s1Match) {
  console.log('=== HERO SECTION (tp-hero) ===');
  console.log(s1Match[0].slice(0, 2500));
}
