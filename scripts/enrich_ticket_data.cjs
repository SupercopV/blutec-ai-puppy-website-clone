const fs = require('fs');
const html = fs.readFileSync('scripts/extracted_gone_home.html', 'utf8');
const regex = /<li class="tp-ticket"[^>]*>([\s\S]*?)<\/li>/g;
const matches = [...html.matchAll(regex)];

const tickets = JSON.parse(fs.readFileSync('src/data/goneHomeTicketsData.json', 'utf8'));

matches.forEach((m, idx) => {
  const tHtml = m[1];
  const bgMatch = tHtml.match(/background-color:(#[0-9a-fA-F]+)/);
  const posMatch = tHtml.match(/object-position:([^;]+)/);
  if (bgMatch && tickets[idx]) {
    tickets[idx].bgColor = bgMatch[1];
  }
  if (posMatch && tickets[idx]) {
    tickets[idx].objectPosition = posMatch[1].trim();
  }
});

fs.writeFileSync('src/data/goneHomeTicketsData.json', JSON.stringify(tickets, null, 2), 'utf8');
console.log('Added bgColor and objectPosition to tickets data.');
