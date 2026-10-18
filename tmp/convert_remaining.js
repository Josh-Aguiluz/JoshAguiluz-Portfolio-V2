const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Use current working directory as base
const baseDir = process.cwd();
const assetsDir = path.join(baseDir, 'src', 'assets');

const imagesToConvert = [
  'comptiaReal.png',
  'firstProj.png'
];

async function convertImages() {
  console.log(`Searching in: ${assetsDir}`);
  for (const image of imagesToConvert) {
    const inputPath = path.join(assetsDir, image);
    const outputPath = path.join(assetsDir, image.replace('.png', '.webp'));
    
    if (fs.existsSync(inputPath)) {
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      console.log(`Converted: ${image} -> ${path.basename(outputPath)}`);
    } else {
      console.log(`File not found: ${inputPath}`);
    }
  }
}

convertImages().catch(console.error);
