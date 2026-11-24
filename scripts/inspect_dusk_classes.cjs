const fs = require('fs');

const html = fs.readFileSync('scripts/scene_6_tp-dusk.html', 'utf8');

const classes = [...html.matchAll(/class="([^"]*)"/g)].map(m => m[1]);
console.log('Unique classes in Scene 6 dusk:');
console.log([...new Set(classes)]);
