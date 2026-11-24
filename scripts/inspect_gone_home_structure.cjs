const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_gone_home.html', 'utf8');

// Header snippet
const ticketStart = html.indexOf('class="tp-tickets"');
console.log('=== HEADER SNIPPET ===');
console.log(html.substring(0, ticketStart));

// First ticket snippet
const firstTicketEnd = html.indexOf('</li>', ticketStart);
console.log('\n=== FIRST TICKET SNIPPET ===');
console.log(html.substring(ticketStart, firstTicketEnd + 5));

// Check all tickets
const tickets = [...html.matchAll(/<li class="tp-ticket"[^>]*>([\s\S]*?)<\/li>/g)];
console.log('\nTOTAL TICKETS COUNT:', tickets.length);
