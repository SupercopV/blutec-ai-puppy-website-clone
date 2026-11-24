const fs = require('fs');
const html = fs.readFileSync('scraped_pages/home.html', 'utf8');

const regex = /<div[^>]*class="[^"]*pup-stop[^"]*"[^>]*>/g;
let m;
let i = 0;
while ((m = regex.exec(html)) !== null) {
  i++;
  const stopTag = m[0];
  const start = m.index;
  const nextStop = html.indexOf('</div></div>', start);
  const block = html.substring(start, nextStop + 12);
  const rootG = block.match(/<g data-p="root"[^>]*>/);
  const headG = block.match(/<g data-p="head"[^>]*>/);
  const bodyG = block.match(/<g data-p="body"[^>]*>/);
  const haunchG = block.match(/<g data-p="haunch"[^>]*>/);
  const ledgeG = block.match(/<g data-p="ledge"[^>]*>/);
  console.log(`=== STOP ${i}: ${stopTag}`);
  console.log('root:', rootG ? rootG[0] : 'none');
  console.log('head:', headG ? headG[0] : 'none');
  console.log('body:', bodyG ? bodyG[0] : 'none');
  console.log('haunch:', haunchG ? haunchG[0] : 'none');
  console.log('ledge:', ledgeG ? ledgeG[0] : 'none');
}
