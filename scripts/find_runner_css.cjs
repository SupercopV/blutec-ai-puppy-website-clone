const fs = require('fs');

const css = fs.readFileSync('src/styles/original.css', 'utf8');

const matches = [...css.matchAll(/([^{}]*tp-runner-[^{}]*\{[^}]+\})/g)];
matches.forEach(m => console.log(m[1]));
