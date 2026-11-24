const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_gone_home.html', 'utf8');

const ticketMatches = [...html.matchAll(/<li class="tp-ticket"[^>]*style="([^"]*)"[^>]*>([\s\S]*?)<\/li>/g)];
console.log('Found tickets count:', ticketMatches.length);

const tickets = [];

ticketMatches.forEach((m, idx) => {
  const style = m[1];
  const inner = m[2];

  const tiltMatch = style.match(/--tilt:([^;]+)/);
  const tilt = tiltMatch ? tiltMatch[1].trim() : '0deg';

  const hrefMatch = inner.match(/href="([^"]+)"/);
  const href = hrefMatch ? hrefMatch[1] : '';

  const nameMatch = inner.match(/class="font-plush tp-ticket__name"[^>]*>([\s\S]*?)<\/span>/);
  const name = nameMatch ? nameMatch[1].trim() : '';

  const kickerMatch = inner.match(/class="font-scrawl tp-ticket__kicker"[^>]*>([\s\S]*?)<\/span>/);
  const kicker = kickerMatch ? kickerMatch[1].trim() : 'one ticket home';

  const metaMatch = inner.match(/class="tp-ticket__meta"[^>]*>([\s\S]*?)<\/span>/);
  const meta = metaMatch ? metaMatch[1].trim() : '';

  let img = '';
  const urlMatch = inner.match(/url=([^&"]+)/);
  if (urlMatch) {
    img = decodeURIComponent(urlMatch[1]);
  } else {
    const srcMatch = inner.match(/src="([^"]+)"/);
    if (srcMatch) img = srcMatch[1];
  }

  const altMatch = inner.match(/alt="([^"]*)"/);
  const alt = altMatch ? altMatch[1] : `${name} puppy`;

  tickets.push({
    id: idx + 1,
    name,
    kicker,
    meta,
    href,
    tilt,
    img,
    alt
  });
});

console.log('Processed tickets:', tickets.length);
console.log('Sample ticket:', tickets[0]);

fs.writeFileSync('src/data/goneHomeTicketsData.json', JSON.stringify(tickets, null, 2));
console.log('Saved to src/data/goneHomeTicketsData.json');
