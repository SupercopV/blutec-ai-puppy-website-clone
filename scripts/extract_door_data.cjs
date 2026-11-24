const fs = require('fs');

const s2 = fs.readFileSync('scripts/scene_2_tp-meet.html', 'utf8');
const doors = [...s2.matchAll(/<li class="tp-door[^"]*"[^>]*>([\s\S]*?)<\/li>/g)];
const doorData = [];

doors.forEach((d, idx) => {
  const nameM = d[1].match(/class="font-plush tp-door__name">([^<]+)<\/span>/);
  const metaM = d[1].match(/class="tp-door__meta">([^<]+)<\/span>/);
  const hrefM = d[1].match(/href="([^"]+)"/);
  const doorColorM = d[1].match(/--door:([^";]+)/);
  const imgM = d[1].match(/src="([^"]+)"/);
  const altM = d[1].match(/alt="([^"]+)"/);
  const bgM = d[1].match(/background-color:([^;]+)/);
  const posM = d[1].match(/object-position:([^;]+)/);
  const tagM = d[1].match(/class="tp-door__tag[^"]*">([^<]+)<\/span>/);
  const allM = d[1].match(/class="font-plush tp-door__all">([^<]+)<\/span>/);

  let rawImg = '';
  if (imgM) {
    const nextUrlMatch = imgM[1].match(/[?&]url=([^&]+)/);
    rawImg = nextUrlMatch ? decodeURIComponent(nextUrlMatch[1]) : imgM[1];
  }

  doorData.push({
    id: idx + 1,
    name: nameM ? nameM[1] : (allM ? allM[1] : ''),
    meta: metaM ? metaM[1] : '',
    href: hrefM ? hrefM[1] : '/puppies',
    doorColor: doorColorM ? doorColorM[1].trim() : '#a24a1a',
    img: rawImg,
    alt: altM ? altM[1] : '',
    bgColor: bgM ? bgM[1] : '',
    objectPosition: posM ? posM[1] : '',
    tag: tagM ? tagM[1] : '',
    isAll: !!allM
  });
});

fs.writeFileSync('scripts/home_doors_data.json', JSON.stringify(doorData, null, 2), 'utf8');
console.log('Saved home_doors_data.json with', doorData.length, 'doors.');
