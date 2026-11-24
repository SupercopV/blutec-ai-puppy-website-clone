const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_home_main.html', 'utf8');

const imgTags = [...html.matchAll(/<img\b([^>]*)>/g)];
console.log('Total <img> tags in home main:', imgTags.length);

const images = [];
imgTags.forEach((m, idx) => {
  const attrs = m[1];
  const srcMatch = attrs.match(/src="([^"]*)"/);
  const altMatch = attrs.match(/alt="([^"]*)"/);
  const bgMatch = attrs.match(/background-color:([^;]+)/);
  const posMatch = attrs.match(/object-position:([^;]+)/);

  // Extract raw media url from /_next/image?url=...
  let rawUrl = '';
  if (srcMatch) {
    const s = srcMatch[1];
    const nextUrlMatch = s.match(/[?&]url=([^&]+)/);
    if (nextUrlMatch) {
      rawUrl = decodeURIComponent(nextUrlMatch[1]);
    } else {
      rawUrl = s;
    }
  }

  images.push({
    index: idx,
    alt: altMatch ? altMatch[1] : '',
    src: srcMatch ? srcMatch[1] : '',
    rawUrl,
    bgColor: bgMatch ? bgMatch[1] : '',
    objectPosition: posMatch ? posMatch[1] : ''
  });
});

console.log('Sample images:');
images.slice(0, 15).forEach(img => {
  console.log(`[${img.index}] ${img.alt} -> ${img.rawUrl}`);
});

fs.writeFileSync('scripts/home_images.json', JSON.stringify(images, null, 2), 'utf8');
