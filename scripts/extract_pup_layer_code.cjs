const fs = require('fs');

const code = fs.readFileSync('scripts/pup_animation_chunk.js', 'utf8');

const eventIdx = code.indexOf('CustomEvent("pup:cue"');
// Let's find where this component function starts
const beforeEvent = code.slice(0, eventIdx);
const lastFunc = beforeEvent.lastIndexOf('function');
console.log('Component starts around:', lastFunc);

// Let's write out the full component function
fs.writeFileSync('scripts/pup_layer_component_raw.js', code.slice(lastFunc - 3000, eventIdx + 200), 'utf8');
console.log('Saved pup_layer_component_raw.js');
