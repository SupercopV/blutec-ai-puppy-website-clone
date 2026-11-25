const fs = require('fs');
const code = fs.readFileSync('scripts/chunks/1cuytp2cyhxp8.js', 'utf8');

// Basic formatting
let formatted = code
  .replace(/;/g, ';\n')
  .replace(/\{/g, '{\n')
  .replace(/\}/g, '\n}\n');

fs.writeFileSync('scripts/contact_chunk_formatted.js', formatted);
console.log('Formatted chunk saved. Size:', code.length, 'bytes');
