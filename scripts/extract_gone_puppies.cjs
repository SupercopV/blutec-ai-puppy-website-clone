const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_puppies.html', 'utf8');

const goneStart = html.indexOf('tp-gone-strip');
const goneEnd = html.indexOf('</section>', goneStart);
const snippet = html.substring(goneStart, goneEnd);

const items = [];
const itemRegex = /<li><a class="tp-sketch tp-sketch--small"([^>]+)>([\s\S]*?)<\/a><\/li>/g;
let match;

while ((match = itemRegex.exec(snippet)) !== null) {
  const attrs = match[1];
  const inner = match[2];

  const hrefMatch = attrs.match(/href="([^"]+)"/);
  const href = hrefMatch ? hrefMatch[1] : '';

  const ariaMatch = attrs.match(/aria-label="([^"]+)"/);
  const ariaLabel = ariaMatch ? ariaMatch[1] : '';

  const tiltMatch = attrs.match(/--tilt:([^;"]+)/);
  const tilt = tiltMatch ? tiltMatch[1].trim() : '-1deg';

  const washMatch = attrs.match(/--wash:([^;"]+)/);
  const wash = washMatch ? washMatch[1].trim() : '#f9cdbf';

  let imgUrl = '';
  const urlMatch = inner.match(/url=([^&"]+)/);
  if (urlMatch) {
    imgUrl = decodeURIComponent(urlMatch[1]);
  } else {
    const srcMatch = inner.match(/src="([^"]+)"/);
    if (srcMatch) imgUrl = srcMatch[1];
  }

  const nameMatch = inner.match(/<span class="tp-sketch__name font-plush">([\s\S]*?)<\/span>/);
  const name = nameMatch ? nameMatch[1].trim() : '';

  const metaMatch = inner.match(/<span class="tp-sketch__meta">([\s\S]*?)<\/span>/);
  const meta = metaMatch ? metaMatch[1].trim() : '';

  items.push({
    name,
    meta,
    href,
    ariaLabel,
    tilt,
    wash,
    img: imgUrl
  });
}

console.log('Extracted gone home strip puppies:', items);
fs.writeFileSync('src/data/goneHomeStripData.json', JSON.stringify(items, null, 2));
