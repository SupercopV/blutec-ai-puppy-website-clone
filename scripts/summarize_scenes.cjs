const fs = require('fs');

for (let i = 1; i <= 8; i++) {
  const files = fs.readdirSync('scripts').filter(f => f.startsWith(`scene_${i}_`));
  if (files.length === 0) continue;
  const content = fs.readFileSync(`scripts/${files[0]}`, 'utf8');
  console.log(`\n================ SCENE ${i}: ${files[0]} ================`);
  
  // Extract tone, style
  const toneMatch = content.match(/data-tone="([^"]*)"/);
  const styleMatch = content.match(/style="([^"]*)"/);
  console.log('Tone:', toneMatch ? toneMatch[1] : 'none');
  console.log('Style:', styleMatch ? styleMatch[1] : 'none');

  // Headings
  const headings = [...content.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/g)].map(h => h[1].replace(/<[^>]+>/g, '').trim());
  console.log('Headings:', headings);

  // Paragraphs
  const paras = [...content.matchAll(/<p[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/p>/g)].map(p => ({
    class: p[1],
    text: p[2].replace(/<[^>]+>/g, '').trim()
  }));
  console.log('Paragraphs:', paras.slice(0, 3));

  // Pup Stops
  const pupStops = [...content.matchAll(/class="[^"]*pup-stop[^"]*"([\s\S]*?)<\/div>/g)];
  console.log('Pup Stops count:', pupStops.length);
  pupStops.forEach((ps, idx) => {
    const pose = ps[1].match(/data-pose="([^"]*)"/);
    const facing = ps[1].match(/data-facing="([^"]*)"/);
    const act = ps[1].match(/data-act="([^"]*)"/);
    console.log(`  Stop #${idx + 1}: pose=${pose?pose[1]:''}, facing=${facing?facing[1]:''}, act=${act?act[1]:''}`);
  });
}
