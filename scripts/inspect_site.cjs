const fs = require('fs');

if (fs.existsSync('scraped_pages/home.html')) {
  const html = fs.readFileSync('scraped_pages/home.html', 'utf8');
  const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  let count = 0;
  while ((match = scriptRegex.exec(html)) !== null) {
    count++;
    const attrs = match[1];
    const body = match[2].trim();
    console.log(`--- Script #${count} (attrs: ${attrs.slice(0, 50)}) ---`);
    if (body.length > 0 && body.length < 3000) {
      console.log(body);
    } else {
      console.log(`Length: ${body.length}`);
    }
  }
}
