const fs = require('fs');

const css = fs.readFileSync('src/styles/original.css', 'utf8');

const selectors = [
  '.tp-hero',
  '.tp-lineup',
  '.tp-quilt',
  '.tp-meet',
  '.tp-door',
  '.tp-paths',
  '.tp-fork',
  '.tp-way',
  '.tp-flight',
  '.tp-chat',
  '.tp-phone',
  '.tp-book',
  '.tp-passport',
  '.tp-stamp',
  '.tp-dusk',
  '.tp-photowall',
  '.tp-night',
  '.tp-qa',
  '.tp-home',
  '.tp-house',
  '.pup-layer',
  '.pup-actor',
  '.pup-prints',
  '.pup-buddy'
];

selectors.forEach(sel => {
  const exists = css.includes(sel);
  console.log(`${sel}: ${exists ? 'FOUND' : 'MISSING'}`);
});
