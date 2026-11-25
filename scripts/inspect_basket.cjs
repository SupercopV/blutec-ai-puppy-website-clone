const fs = require('fs');
const css = fs.readFileSync('src/styles/original.css', 'utf8');

const regex = /[^{}]*basket[^{}]*\{[^}]*\}/g;
let m;
while ((m = regex.exec(css)) !== null) {
  console.log(m[0]);
}
