const fs = require('fs');

const html = fs.readFileSync('scraped_pages/puppies.html', 'utf8');

// Find sketch or card
const cardIdx = html.indexOf('class="tp-sketch');
if (cardIdx !== -1) {
  console.log('=== PUPPY CARD IN PUPPIES.HTML ===');
  console.log(html.substring(cardIdx - 40, cardIdx + 1200));
} else {
  // search for puppy name
  const copperIdx = html.indexOf('Copper');
  if (copperIdx !== -1) {
    console.log('=== COPPER CARD CHUNK ===');
    console.log(html.substring(copperIdx - 300, copperIdx + 600));
  }
}
