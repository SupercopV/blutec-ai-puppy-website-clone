const fs = require('fs');

const html = fs.readFileSync('scripts/scene_7_tp-night.html', 'utf8');

const qas = [...html.matchAll(/<div class="tp-qa"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g)];
console.log('QAs count in scene 7:', qas.length);

const qaList = [];
qas.forEach((q, idx) => {
  const question = q[1].match(/<dt[^>]*>([\s\S]*?)<\/dt>/);
  const answer = q[1].match(/<dd[^>]*>([\s\S]*?)<\/dd>/);
  qaList.push({
    id: idx + 1,
    q: question ? question[1].replace(/<[^>]+>/g, '').trim() : '',
    a: answer ? answer[1].replace(/<[^>]+>/g, '').trim() : ''
  });
});

console.log('QA sample:');
qaList.forEach(item => console.log(`Q: ${item.q}`));
fs.writeFileSync('scripts/home_faq_data.json', JSON.stringify(qaList, null, 2), 'utf8');
