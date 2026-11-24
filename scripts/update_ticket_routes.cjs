const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_gone_home.html', 'utf8');
const regex = /<li class="tp-ticket"[^>]*>([\s\S]*?)<\/li>/g;
const matches = [...html.matchAll(regex)];
console.log('Total tickets matched:', matches.length);

const tickets = JSON.parse(fs.readFileSync('src/data/goneHomeTicketsData.json', 'utf8'));

matches.forEach((m, idx) => {
  const tHtml = m[1];
  const routeMatch = tHtml.match(/<span class="tp-ticket__route">\s*<span>(.*?)<\/span>[\s\S]*?<span>(.*?)<\/span>\s*<\/span>/);
  if (routeMatch && tickets[idx]) {
    tickets[idx].from = routeMatch[1].trim();
    tickets[idx].to = routeMatch[2].trim();
  }
});

fs.writeFileSync('src/data/goneHomeTicketsData.json', JSON.stringify(tickets, null, 2), 'utf8');
console.log('Successfully updated ticket route info.');
