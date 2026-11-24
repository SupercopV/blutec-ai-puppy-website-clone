const fs = require('fs');

const code = fs.readFileSync('scripts/pup_animation_chunk.js', 'utf8');

// Find occurrences of pup-actor, pup-prints, pup-stop, scroll, transform, pose
console.log('Chunk length:', code.length);

// Let's search for keywords
const keywords = ['pup-actor', 'pup-prints', 'pup-stop', 'pup-bubble', 'pose', 'trot', 'run', 'peek', 'sit', 'bow', 'data-pup-scene', 'requestAnimationFrame', 'scrollY', 'scroll'];

keywords.forEach(kw => {
  let count = 0;
  let pos = code.indexOf(kw);
  while (pos !== -1) {
    count++;
    pos = code.indexOf(kw, pos + 1);
  }
  console.log(`Keyword "${kw}": ${count} occurrences`);
});

// Let's extract snippets around pup-actor and pup-prints
let idx = 0;
while ((idx = code.indexOf('pup-actor', idx)) !== -1) {
  console.log('\n--- SNIPPET AROUND pup-actor ---');
  console.log(code.slice(Math.max(0, idx - 150), idx + 250));
  idx += 'pup-actor'.length;
}
