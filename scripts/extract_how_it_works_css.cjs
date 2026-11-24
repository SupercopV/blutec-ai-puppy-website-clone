const fs = require('fs');
const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const html = fs.readFileSync('scraped_pages/how-it-works.html', 'utf8');
  const cssMatches = [...html.matchAll(/href="([^"]+\.css)"/g)].map(m => m[1]);
  console.log('CSS Matches:', cssMatches);

  let fullCss = '';
  for (const href of cssMatches) {
    const url = href.startsWith('http') ? href : `https://puppy.instabizweb.com${href.startsWith('/') ? '' : '/'}${href}`;
    console.log('Fetching:', url);
    try {
      const content = await fetch(url);
      fullCss += '\n/* ' + url + ' */\n' + content;
    } catch (e) {
      console.error('Failed to fetch:', url, e.message);
    }
  }

  fs.writeFileSync('scripts/how_it_works_bundle.css', fullCss);
  console.log('Saved bundle, size:', fullCss.length);

  // Extract rules matching tp-journeys, tp-switch, tp-step, tp-paper, tp-stamp, tp-entry, tp-board, tp-flight, tp-postcard
  const targets = [
    'tp-journeys', 'tp-switch', 'tp-journey', 'tp-step', 'tp-postcard',
    'tp-paper', 'tp-stamp', 'tp-entry', 'tp-flight', 'tp-board'
  ];

  const matchedRules = [];
  // Split CSS into rules roughly or search targets
  targets.forEach(t => {
    let pos = 0;
    while ((pos = fullCss.indexOf('.' + t, pos)) !== -1) {
      // Find beginning of rule or selector
      let start = fullCss.lastIndexOf('}', pos);
      if (start === -1) start = 0; else start += 1;
      // Find end of rule
      let braceCount = 0;
      let end = pos;
      let foundOpen = false;
      while (end < fullCss.length) {
        if (fullCss[end] === '{') {
          braceCount++;
          foundOpen = true;
        } else if (fullCss[end] === '}') {
          braceCount--;
          if (foundOpen && braceCount === 0) {
            end++;
            break;
          }
        }
        end++;
      }
      const rule = fullCss.substring(start, end).trim();
      if (!matchedRules.includes(rule)) {
        matchedRules.push(rule);
      }
      pos = end;
    }
  });

  console.log('Found matched rules count:', matchedRules.length);
  fs.writeFileSync('scripts/extracted_how_it_works_rules.css', matchedRules.join('\n\n'));
  console.log('Saved to scripts/extracted_how_it_works_rules.css');
}

run();
