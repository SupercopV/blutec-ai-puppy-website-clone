const fs = require('fs');
const html = fs.readFileSync('scripts/extracted_how_it_works.html', 'utf8');

// Print Section 1: Hero
const s1_start = html.indexOf('<section');
const s2_start = html.indexOf('<section class="tp-journeys"');
console.log('=== SECTION 1 (HERO) ===');
console.log(html.substring(s1_start, s2_start));

// Print Section 2: Journeys
const s3_start = html.indexOf('<section id="promise"');
console.log('=== SECTION 2 (JOURNEYS) ===');
console.log(html.substring(s2_start, s2_start + 1500));
