const fs = require('fs');

const content = fs.readFileSync('scripts/scene_4_tp-chat.html', 'utf8');

// Print main parts of Scene 4
const h2 = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
console.log('Heading:', h2 ? h2[1] : '');

const steps = [...content.matchAll(/<li class="tp-chat__step"[^>]*>([\s\S]*?)<\/li>/g)];
console.log('Chat steps count:', steps.length);
steps.forEach((s, idx) => {
  const h3 = s[1].match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
  const p = s[1].match(/<p[^>]*>([\s\S]*?)<\/p>/);
  console.log(`Step #${idx + 1}: ${h3?h3[1]:''} -> ${p?p[1]:''}`);
});

// Check the phone mockup / chat mockup
const phone = content.match(/<div class="tp-phone"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
if (phone) {
  console.log('Phone mockup found, length:', phone[0].length);
  console.log(phone[0].slice(0, 500));
} else {
  const chatStage = content.match(/<div class="tp-chat__stage"[\s\S]*?<\/div>/);
  console.log('Chat stage:', chatStage ? chatStage[0].slice(0, 300) : 'none');
}
