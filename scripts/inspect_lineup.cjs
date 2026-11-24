const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_home_main.html', 'utf8');

const lineupMatches = [...html.matchAll(/<li class="tp-lineup__seat"([^>]*)>([\s\S]*?)<\/li>/g)];
console.log('Lineup seats count:', lineupMatches.length);

lineupMatches.forEach((m, idx) => {
  const style = m[1].match(/style="([^"]*)"/);
  const link = m[2].match(/href="([^"]*)"/);
  const label = m[2].match(/aria-label="([^"]*)"/);
  const img = m[2].match(/src="([^"]*)"/);
  const imgAlt = m[2].match(/alt="([^"]*)"/);
  const bg = m[2].match(/background-color:([^;]+)/);
  const pos = m[2].match(/object-position:([^;]+)/);
  
  console.log(`Seat #${idx + 1}:`);
  console.log(' - style:', style ? style[1] : '');
  console.log(' - href:', link ? link[1] : '');
  console.log(' - label:', label ? label[1] : '');
  console.log(' - img:', img ? img[1] : '');
  console.log(' - alt:', imgAlt ? imgAlt[1] : '');
  console.log(' - bg:', bg ? bg[1] : '');
  console.log(' - pos:', pos ? pos[1] : '');
});
