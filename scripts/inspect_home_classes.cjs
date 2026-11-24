const fs = require('fs');

const html = fs.readFileSync('scripts/scene_8_tp-home.html', 'utf8');

const classes = [...html.matchAll(/class="([^"]*)"/g)].map(m => m[1]);
console.log('Unique classes in Scene 8 home:');
console.log([...new Set(classes)]);
