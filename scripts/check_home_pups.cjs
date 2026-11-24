const fs = require('fs');
const html = fs.readFileSync('scraped_pages/home.html', 'utf8');

const matches = [];
let regex = /<div[^>]*class="[^"]*pup-stop[^"]*"[^>]*>/g;
let m;
while ((m = regex.exec(html)) !== null) {
  matches.push(m[0]);
}
console.log('Pup stops in home.html:', matches.length);
matches.forEach((item, i) => console.log(i + 1, item));

const quiltRegex = /tp-quilt[^"]*/g;
const quilts = html.match(quiltRegex) || [];
console.log('Quilt elements:', quilts);
