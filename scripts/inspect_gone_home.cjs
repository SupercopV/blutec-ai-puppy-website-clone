const fs = require('fs');

const html = fs.readFileSync('scraped_pages/gone-home.html', 'utf8');

const ticketIdx = html.indexOf('tp-ticket');
if (ticketIdx !== -1) {
  console.log('=== TP-TICKET IN GONE HOME ===');
  console.log(html.substring(ticketIdx - 30, ticketIdx + 800));
}
