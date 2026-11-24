const fs = require('fs');

const html = fs.readFileSync('scraped_pages/puppies.html', 'utf8');

// Extract Header
const headerStart = html.indexOf('<header');
const headerEnd = html.indexOf('</header>', headerStart) + 9;
const headerHtml = html.substring(headerStart, headerEnd);
fs.writeFileSync('scripts/extracted_header.html', headerHtml, 'utf8');
console.log('Header length:', headerHtml.length);

// Extract Footer
const footerStart = html.indexOf('<footer');
const footerEnd = html.indexOf('</footer>', footerStart) + 9;
const footerHtml = html.substring(footerStart, footerEnd);
fs.writeFileSync('scripts/extracted_footer.html', footerHtml, 'utf8');
console.log('Footer length:', footerHtml.length);
