const fs = require('fs');

const html = fs.readFileSync('scripts/scene_5_tp-passport.html', 'utf8');

const classes = [...html.matchAll(/class="([^"]*)"/g)].map(m => m[1]);
console.log('Unique classes in Scene 5 passport:');
console.log([...new Set(classes)]);
