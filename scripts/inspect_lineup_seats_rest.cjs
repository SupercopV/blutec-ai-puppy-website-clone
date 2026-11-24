const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_home_main.html', 'utf8');

const matches = [...html.matchAll(/<li class="tp-lineup__seat"([^>]*)>([\s\S]*?)<\/li>/g)];
for (let i = 6; i < matches.length; i++) {
  console.log(`Seat #${i + 1}:`);
  console.log(matches[i][0]);
}
