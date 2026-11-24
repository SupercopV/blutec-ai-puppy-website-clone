const tickets = require('../src/data/goneHomeTicketsData.json');
console.log('Count:', tickets.length);
console.log('Names:', tickets.map(t => t.name).join(', '));
