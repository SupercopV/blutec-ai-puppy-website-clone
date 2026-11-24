const fs = require('fs');

const html = fs.readFileSync('scraped_pages/home.html', 'utf8');

// Search for pup-layer
const layerIdx = html.indexOf('pup-layer');
if (layerIdx !== -1) {
  console.log('Found pup-layer around index:', layerIdx);
  console.log(html.slice(Math.max(0, layerIdx - 200), layerIdx + 1500));
} else {
  console.log('pup-layer not found');
}
