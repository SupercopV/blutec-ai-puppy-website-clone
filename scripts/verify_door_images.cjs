const fs = require('fs');
const path = require('path');

const doors = JSON.parse(fs.readFileSync('scripts/home_doors_data.json', 'utf8'));
doors.forEach((door, idx) => {
  if (door.isAll) {
    console.log(`[${idx + 1}] All doors link (no image)`);
    return;
  }
  const localPath = path.join('public', door.img);
  const exists = fs.existsSync(localPath);
  console.log(`[${idx + 1}] ${door.name} -> ${door.img} (exists: ${exists})`);
});
