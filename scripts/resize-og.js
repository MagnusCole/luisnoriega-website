// Usage: node --input-type=module scripts/resize-og.js
// Requires: npm install sharp
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const src = path.resolve(__dirname, '..', 'public', 'og-source.png');
const out = path.resolve(__dirname, '..', 'public', 'og.png');

if (!fs.existsSync(src)) {
  console.error('Source image not found:', src);
  process.exit(1);
}

try {
  await sharp(src)
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 80 })
    .toFile(out);
  console.log('Saved', out);
} catch (err) {
  console.error(err);
  process.exit(1);
}
