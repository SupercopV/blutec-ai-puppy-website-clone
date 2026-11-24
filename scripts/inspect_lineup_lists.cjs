const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_home_main.html', 'utf8');

const matches = [...html.matchAll(/<ul class="([^"]*tp-lineup[^"]*)"[^>]*>([\s\S]*?)<\/ul>/g)];
matches.forEach((m, idx) => {
  console.log(`List #${idx + 1} class: ${m[1]}`);
  console.log(m[2].slice(0, 400));
});
