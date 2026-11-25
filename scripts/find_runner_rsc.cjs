const fs = require('fs');
const files = fs.readdirSync('scraped_pages');
console.log('Files:', files);

// Check if any script mentions pup-stop or pup-actor
const scripts = fs.readdirSync('public').concat(fs.readdirSync('.'));
console.log('Searching for runner logic in extracted rsc...');
const rsc = fs.readFileSync('scripts/extracted_home_rsc.txt', 'utf8');
const pupIdx = rsc.indexOf('pup-stop');
console.log('pup-stop index in rsc:', pupIdx);
if (pupIdx !== -1) {
  console.log(rsc.substring(pupIdx - 200, pupIdx + 500));
}
