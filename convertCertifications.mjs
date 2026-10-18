import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import pdf2img from 'pdf-img-convert';

const ASSETS_DIR = './src/assets';

async function convertFile(filename, outputName) {
  try {
    const filePath = path.join(ASSETS_DIR, filename);
    const outputPath = path.join(ASSETS_DIR, outputName);

    console.log(`Converting ${filename} to ${outputName}...`);
    
    // Convert PNG
    if (filename.toLowerCase().endsWith('.png') || filename.toLowerCase().endsWith('.jpg')) {
      await sharp(filePath)
        .webp({ quality: 90 })
        .toFile(outputPath);
      console.log(`✅ Converted ${filename} to ${outputName}`);
      return;
    }
    
    // Convert PDF
    if (filename.toLowerCase().endsWith('.pdf')) {
      const pdfArray = await pdf2img.convert(filePath, {
        width: 800,
        page_numbers: [1] // convert first page only
      });
      
      const imageBuffer = Buffer.from(pdfArray[0]);
      
      await sharp(imageBuffer)
        .webp({ quality: 90 })
        .toFile(outputPath);
        
      console.log(`✅ Converted ${filename} to ${outputName}`);
      return;
    }
    
  } catch (err) {
    console.error(`❌ Failed to convert ${filename}:`, err.message);
  }
}

async function run() {
  console.log('Starting conversions...');
  
  // Note: if user only has 916057e4d784a6f22523da6d03e95bf8726dd99b.png instead of comptia.png
  // Check if comptia.png exists, if not use the hex one
  let comptiaFilename = 'comptiaReal.png';
  try {
    await fs.access(path.join(ASSETS_DIR, comptiaFilename));
  } catch (e) {
    comptiaFilename = 'comptia.png';
    try {
      await fs.access(path.join(ASSETS_DIR, comptiaFilename));
    } catch (e2) {
      comptiaFilename = '916057e4d784a6f22523da6d03e95bf8726dd99b.png';
    }
  }
  
  await convertFile('phpBasics.pdf', 'phpBasics.webp');
  await convertFile(comptiaFilename, 'comptiaReal.webp');
  await convertFile('ccna.pdf', 'ccna.webp');
  await convertFile('aws.pdf', 'aws.webp');
  await convertFile('profile_professional.png', 'profile_professional.webp');
  await convertFile('casualProf.jpg', 'casualProf.webp');
  
  console.log('🎉 All conversions finished!');
}

run();
