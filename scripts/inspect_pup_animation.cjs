const fs = require('fs');

const html = fs.readFileSync('scraped_pages/home.html', 'utf8');

// Find all elements with class containing 'pup'
const pupClasses = [...html.matchAll(/class="([^"]*pup[^"]*)"/g)];
const uniqueClasses = [...new Set(pupClasses.map(m => m[1]))];
console.log('Unique pup classes in home.html:');
console.log(uniqueClasses);

// Search for any runner or floating elements
const runnerMatches = [...html.matchAll(/<div[^>]*class="[^"]*(?:runner|track|float|buddy|companion|mascot|lead|stage)[^"]*"[^>]*>/g)];
console.log('\nMatches for runner/companion/stage etc:');
runnerMatches.forEach(m => console.log(m[0].slice(0, 150)));

// Check what JS bundles or inline scripts exist
const scripts = [...html.matchAll(/<script[^>]*src="([^"]*)"[^>]*>/g)];
console.log('\nScripts referenced:');
scripts.forEach(s => console.log(s[1]));
