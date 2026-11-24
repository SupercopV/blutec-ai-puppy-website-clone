const fs = require('fs');

const html = fs.readFileSync('scraped_pages/home.html', 'utf8');
const start = html.indexOf('class="tp-curtain"');
if (start !== -1) {
  const divStart = html.lastIndexOf('<div', start);
  const nextHeader = html.indexOf('<header', divStart);
  const curtainHtml = html.substring(divStart, nextHeader !== -1 ? nextHeader : divStart + 5000);
  fs.writeFileSync('scripts/curtain_extracted.html', curtainHtml, 'utf8');
  console.log('Wrote curtain_extracted.html, length:', curtainHtml.length);
}

// Also check images in home.html
const imgTags = [...html.matchAll(/<img\b([^>]*)>/gi)];
console.log('Total img tags in home.html:', imgTags.length);
imgTags.slice(0, 10).forEach((img, i) => {
  console.log(`Img #${i}: ${img[1]}`);
});
