const fs = require('fs');
const path = require('path');

function getJpegSize(buffer) {
  let i = 2;
  while (i < buffer.length) {
    if (buffer[i] === 0xFF) {
      const marker = buffer[i + 1];
      const length = buffer.readUInt16BE(i + 2);
      if (marker >= 0xC0 && marker <= 0xC3) {
        const height = buffer.readUInt16BE(i + 5);
        const width = buffer.readUInt16BE(i + 7);
        return { width, height };
      }
      i += 2 + length;
    } else {
      i++;
    }
  }
  return null;
}

function getPngSize(buffer) {
  // IHDR chunk starts at byte 8
  if (buffer.slice(0, 8).toString('hex') !== '89504e470d0a1a0a') return null;
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

(async function scan() {
  const dir = path.join(__dirname, '..', 'public', 'dheeraj-images');
  const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  const results = [];
  for (const name of files) {
    const full = path.join(dir, name);
    try {
      const buffer = fs.readFileSync(full);
      let size = null;
      if (buffer.slice(0, 2).toString('hex') === 'ffd8') {
        size = getJpegSize(buffer);
      } else if (buffer.slice(0, 8).toString('hex') === '89504e470d0a1a0a') {
        size = getPngSize(buffer);
      } else if (buffer.slice(0, 4).toString('hex') === '52494646') {
        // RIFF - could be WEBP
        // Attempt to parse WebP VP8/VP8L
        // For simplicity, skip webp
        size = null;
      }
      if (!size) {
        results.push({ name, width: 0, height: 0, ratio: 0 });
      } else {
        results.push({ name, width: size.width, height: size.height, ratio: +(size.width / size.height).toFixed(3) });
      }
    } catch (e) {
      results.push({ name, width: 0, height: 0, ratio: 0 });
    }
  }
  console.log(JSON.stringify(results, null, 2));
})();
