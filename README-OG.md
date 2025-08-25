How to create an optimized OG image (1200x630)

1. Save your source image to: public/og-source.png
2. Install sharp in the project (once):

   npm install sharp

3. Run the ESM node script:

   node --input-type=module scripts/resize-og.js

4. The script writes: public/og.png (JPEG, 80% quality, 1200x630)

If you prefer PNG output, edit the script to use .png() instead of .jpeg().
