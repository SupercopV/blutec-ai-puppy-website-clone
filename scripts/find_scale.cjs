const fs = require('fs');
const content = fs.readFileSync('scripts/extracted_client_chunk.js', 'utf8');

// Find all occurrences of scale in the runner section
const pupIdx = content.indexOf('pup-layer');
const runnerSection = content.substring(pupIdx - 6000, pupIdx + 4000);

const scaleMatches = runnerSection.match(/.{0,60}scale.{0,60}/g);
console.log('Scale occurrences:');
if (scaleMatches) {
  scaleMatches.forEach(m => console.log('->', m));
}
