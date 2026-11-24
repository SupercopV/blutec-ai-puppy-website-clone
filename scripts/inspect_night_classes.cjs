const fs = require('fs');

const html = fs.readFileSync('scripts/scene_7_tp-night.html', 'utf8');

const classes = [...html.matchAll(/class="([^"]*)"/g)].map(m => m[1]);
console.log('Unique classes in Scene 7 night:');
console.log([...new Set(classes)]);
