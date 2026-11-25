const fs = require('fs');
const css = fs.readFileSync('src/styles/original.css', 'utf8');

const regex = /\.pup-[^{]+{[^}]+}/g;
let m;
let count = 0;
while ((m = regex.exec(css)) !== null) {
  console.log(m[0]);
  count++;
  if (count > 25) break;
}
