const fs = require('fs');
const css = fs.readFileSync('src/styles/original.css', 'utf8');
const idx = css.indexOf('@media (max-width:639px){.tp-hero__stage');
console.log(css.substring(idx, idx + 600));
