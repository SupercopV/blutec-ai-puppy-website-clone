const fs = require('fs');

const content = fs.readFileSync('scripts/scene_4_tp-chat.html', 'utf8');

const phoneMatch = content.match(/<div class="tp-phone"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/);
if (phoneMatch) {
  fs.writeFileSync('scripts/extracted_phone_markup.html', phoneMatch[0], 'utf8');
  console.log('Extracted phone markup length:', phoneMatch[0].length);
}
