const fs = require('fs');

const html = fs.readFileSync('scraped_pages/home.html', 'utf8');

// Extract all self.__next_f.push lines
const rscMatches = [...html.matchAll(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g)];
console.log('RSC pushes found:', rscMatches.length);

let fullRSC = '';
rscMatches.forEach(m => {
  // unescape javascript string
  try {
    const unescaped = JSON.parse(`"${m[1]}"`);
    fullRSC += unescaped;
  } catch (e) {
    fullRSC += m[1];
  }
});

fs.writeFileSync('scripts/extracted_home_rsc.txt', fullRSC, 'utf8');
console.log('Extracted full RSC to scripts/extracted_home_rsc.txt, length:', fullRSC.length);
