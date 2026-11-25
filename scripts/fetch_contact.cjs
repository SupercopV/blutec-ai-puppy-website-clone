const https = require('https');
const fs = require('fs');

function fetchPage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log(`Redirecting to ${res.headers.location}`);
        return resolve(fetchPage(res.headers.location, dest));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        fs.writeFileSync(dest, data);
        console.log(`Fetched ${url} (${data.length} bytes) -> ${dest}`);
        resolve(data);
      });
    }).on('error', reject);
  });
}

async function main() {
  try {
    await fetchPage('https://puppy.instabizweb.com/contact', 'scripts/extracted_contact.html');
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

main();
