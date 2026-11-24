const fs = require('fs');

const html = fs.readFileSync('scripts/extracted_home_main.html', 'utf8');

const scenes = [...html.matchAll(/<section[^>]*class="tp-scene ([^"]*)"[^>]*>([\s\S]*?)<\/section>/g)];
console.log('Scenes count:', scenes.length);

scenes.forEach((s, idx) => {
  const sceneName = s[1];
  const content = s[2];
  fs.writeFileSync(`scripts/scene_${idx + 1}_${sceneName.replace(/\s+/g, '_')}.html`, s[0], 'utf8');
  console.log(`Saved scripts/scene_${idx + 1}_${sceneName}.html (${s[0].length} bytes)`);
});
