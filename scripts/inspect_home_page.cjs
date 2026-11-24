const fs = require('fs');

const html = fs.readFileSync('scraped_pages/home.html', 'utf8');
console.log('Home HTML length:', html.length);

// Extract main content
const mainMatch = html.match(/<main[\s\S]*?<\/main>/);
if (mainMatch) {
  console.log('Main tag found, length:', mainMatch[0].length);
  fs.writeFileSync('scripts/extracted_home_main.html', mainMatch[0], 'utf8');
} else {
  console.log('No <main> tag found.');
}

// Find all sections or divs with class starting with tp-
const sections = [...html.matchAll(/<section[^>]*class="([^"]*)"[^>]*>/g)];
console.log('Sections found:');
sections.forEach(s => console.log(' - ' + s[1]));

// Check for script tags or any animations
const pupMatches = [...html.matchAll(/(data-pup-[a-z0-9_-]+="[^"]*")/g)];
const uniquePups = [...new Set(pupMatches.map(m => m[1]))];
console.log('Unique data-pup attributes:', uniquePups);
