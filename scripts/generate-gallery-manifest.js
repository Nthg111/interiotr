const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'public', 'dheeraj-images');
const outFile = path.join(srcDir, 'manifest.json');

function tidyTitle(name) {
  return name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
}

function getImageSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.length < 10) return null;

  // PNG
  if (buffer.readUInt32BE(0) === 0x89504e47) {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  // JPEG
  if (buffer.readUInt16BE(0) === 0xffd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      const size = buffer.readUInt16BE(offset + 2);
      const isSof = [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker);
      if (isSof) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }
      offset += 2 + size;
    }
  }

  // WEBP (basic support)
  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
    const chunkType = buffer.toString('ascii', 12, 16);
    if (chunkType === 'VP8X' && buffer.length >= 30) {
      const width = 1 + buffer.readUIntLE(24, 3);
      const height = 1 + buffer.readUIntLE(27, 3);
      return { width, height };
    }
  }

  return null;
}

try {
  const files = fs.readdirSync(srcDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  const items = files.map((name) => {
    const filePath = path.join(srcDir, name);
    const size = getImageSize(filePath);
    const width = size?.width ?? null;
    const height = size?.height ?? null;
    const aspectRatio = width && height ? width / height : null;
    const orientation = aspectRatio == null
      ? 'landscape'
      : aspectRatio > 1.08
        ? 'landscape'
        : aspectRatio < 0.92
          ? 'portrait'
          : 'square';
    const featured = aspectRatio != null && (aspectRatio >= 1.75 || aspectRatio <= 0.68);
    const lower = name.toLowerCase();
    const isBathroom = /basin|sink|wash|toilet|bathroom|bath|wc/i.test(lower);
    const obj = { name, title: tidyTitle(name), width, height, aspectRatio, orientation, featured };
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
