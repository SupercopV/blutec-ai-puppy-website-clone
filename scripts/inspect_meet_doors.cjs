const fs = require('fs');

const content = fs.readFileSync('scripts/scene_2_tp-meet.html', 'utf8');

// Find all doors
const doors = [...content.matchAll(/<li class="tp-door[^"]*"([\s\S]*?)<\/li>/g)];
console.log('Total doors in meet:', doors.length);

doors.slice(0, 10).forEach((d, idx) => {
  const name = d[1].match(/class="font-plush tp-door__name">([^<]+)<\/span>/);
  const meta = d[1].match(/class="tp-door__meta">([^<]+)<\/span>/);
  const href = d[1].match(/href="([^"]+)"/);
  const img = d[1].match(/src="([^"]+)"/);
  const style = d[1].match(/style="([^"]+)"/);
  console.log(`Door #${idx + 1}:`);
  console.log(' - Name:', name ? name[1] : 'all');
  console.log(' - Meta:', meta ? meta[1] : '');
  console.log(' - Href:', href ? href[1] : '');
  console.log(' - Style:', style ? style[1] : '');
});
