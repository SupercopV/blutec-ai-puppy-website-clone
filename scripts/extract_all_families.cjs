const fs = require('fs');

const main = fs.readFileSync('scripts/extracted_happy_families.html', 'utf8');

// Match all li.tp-wall__item
const items = [];
const itemRegex = /<li class="tp-wall__item"[^>]*>([\s\S]*?)<\/li>/g;
let match;

let idx = 0;
while ((match = itemRegex.exec(main)) !== null) {
  const content = match[1];
  
  // Extract tilt
  const tiltMatch = content.match(/--tilt:([^;"]+)/);
  const tilt = tiltMatch ? tiltMatch[1].trim() : '0deg';

  // Extract tape color
  const tapeMatch = content.match(/--tape:([^;"]+)/);
  const tape = tapeMatch ? tapeMatch[1].trim() : '#f6d79a';

  // Extract tape class
  const tapeClassMatch = content.match(/class="tp-tape\s+([^"]+)"/);
  const tapeClass = tapeClassMatch ? tapeClassMatch[1].trim() : 'tp-tape--center';

  // Extract image src / url
  let imgUrl = '';
  const urlMatch = content.match(/url=([^&"]+)/);
  if (urlMatch) {
    imgUrl = decodeURIComponent(urlMatch[1]);
  } else {
    const srcMatch = content.match(/src="([^"]+)"/);
    if (srcMatch) imgUrl = srcMatch[1];
  }

  // Extract alt
  const altMatch = content.match(/alt="([^"]*)"/);
  const alt = altMatch ? altMatch[1] : 'A happy TeddyPups family with their new puppy';

  // Extract caption if any
  const capMatch = content.match(/<span class="tp-polaroid__caption">([\s\S]*?)<\/span>/);
  const caption = capMatch ? capMatch[1].trim() : '';

  // Extract paw if any
  const hasPaw = content.includes('tp-wall__paw');

  items.push({
    id: idx + 1,
    img: imgUrl,
    alt,
    caption,
    tilt,
    tape,
    tapeClass,
    hasPaw
  });
  idx++;
}

console.log('Extracted items count:', items.length);
fs.writeFileSync('src/data/happyFamiliesData.json', JSON.stringify(items, null, 2));
console.log('Saved to src/data/happyFamiliesData.json');
