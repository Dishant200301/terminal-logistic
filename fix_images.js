const fs = require('fs');
const path = require('path');
const https = require('https');

const dirPath = path.join(__dirname, 'public', 'images', 'home', 'frame');

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function fixBrokenImages() {
  try {
    const files = fs.readdirSync(dirPath);
    let fixedCount = 0;

    for (const file of files) {
      if (file.endsWith('.webp')) {
        const filePath = path.join(dirPath, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // Check if the file is broken text containing "No Content:"
        if (content.startsWith('No Content: ')) {
          const url = content.replace('No Content: ', '').trim();
          console.log(`Downloading actual image for ${file} from ${url}...`);
          
          try {
            await downloadImage(url, filePath);
            fixedCount++;
          } catch (err) {
            console.error(`Error downloading ${file}:`, err.message);
          }
        }
      }
    }
    
    console.log(`\nSuccessfully fixed ${fixedCount} images! You and I can now see them.`);
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

fixBrokenImages();
