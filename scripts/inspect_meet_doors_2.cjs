const fs = require('fs');

const content = fs.readFileSync('scripts/scene_2_tp-meet.html', 'utf8');

const doors = [...content.matchAll(/<li class="tp-door[^"]*"([\s\S]*?)<\/li>/g)];

doors.slice(10).forEach((d, idx) => {
  const name = d[1].match(/class="font-plush tp-door__name">([^<]+)<\/span>/);
  const href = d[1].match(/href="([^"]+)"/);
  const allMatch = d[1].match(/class="font-plush tp-door__all">([^<]+)<\/span>/);
  console.log(`Door #${idx + 11}: Name=${name ? name[1] : (allMatch ? allMatch[1] : 'none')}, Href=${href ? href[1] : ''}`);
});
