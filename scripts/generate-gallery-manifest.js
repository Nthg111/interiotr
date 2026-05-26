const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'public', 'dheeraj-images');
const outFile = path.join(srcDir, 'manifest.json');

function tidyTitle(name) {
  return name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
}

try {
  const files = fs.readdirSync(srcDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  const items = files.map((name) => {
    const lower = name.toLowerCase();
    const isBathroom = /basin|sink|wash|toilet|bathroom|bath|wc/i.test(lower);
    const obj = { name, title: tidyTitle(name) };
    if (isBathroom) {
      // heuristic: bathroom photos often have the subject towards the lower-left
      obj.objectPosition = 'left 100%';
    }
    return obj;
  });
  fs.writeFileSync(outFile, JSON.stringify(items, null, 2), 'utf8');
  console.log('Wrote', outFile);
} catch (err) {
  console.error('Error generating manifest:', err.message || err);
  process.exit(1);
}
