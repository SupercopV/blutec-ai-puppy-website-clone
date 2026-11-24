const fs = require('fs');

const s6 = fs.readFileSync('scripts/scene_6_tp-dusk.html', 'utf8');
const polaroids = [...s6.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)];
const duskData = [];

polaroids.forEach((p, idx) => {
  const captionM = p[1].match(/class="tp-polaroid__caption font-scrawl">([^<]+)<\/span>/);
  const tiltM = p[1].match(/--tilt:([^";]+)/);
  const tapeM = p[1].match(/--tape:([^";]+)/);
  const tapePosM = p[1].match(/class="tp-tape tp-tape--([^"]+)"/);
  const imgM = p[1].match(/src="([^"]+)"/);
  const altM = p[1].match(/alt="([^"]+)"/);

  let rawImg = '';
  if (imgM) {
    const nextUrlMatch = imgM[1].match(/[?&]url=([^&]+)/);
    rawImg = nextUrlMatch ? decodeURIComponent(nextUrlMatch[1]) : imgM[1];
  }

  if (captionM || rawImg) {
    duskData.push({
      id: idx + 1,
      caption: captionM ? captionM[1] : '',
      tilt: tiltM ? tiltM[1].trim() : '0deg',
      tape: tapeM ? tapeM[1].trim() : '#cfe5f6',
      tapePos: tapePosM ? tapePosM[1].trim() : 'center',
      img: rawImg,
      alt: altM ? altM[1] : ''
    });
  }
});

fs.writeFileSync('scripts/home_dusk_data.json', JSON.stringify(duskData, null, 2), 'utf8');
console.log('Saved home_dusk_data.json with', duskData.length, 'polaroids.');
