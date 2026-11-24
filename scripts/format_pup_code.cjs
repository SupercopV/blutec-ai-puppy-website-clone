const fs = require('fs');

const raw = fs.readFileSync('scripts/pup_layer_component_raw.js', 'utf8');

// Let's replace common minified tokens with newlines to inspect clearly
const formatted = raw
  .replace(/;/g, ';\n')
  .replace(/\{/g, '{\n')
  .replace(/\}/g, '\n}\n');

fs.writeFileSync('scripts/pup_layer_formatted.js', formatted, 'utf8');
console.log('Formatted lines:', formatted.split('\n').length);
