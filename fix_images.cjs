const fs = require('fs');
const path = require('path');
const https = require('https');

const dirPath = path.join(__dirname, 'public', 'images', 'home', 'frame');

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      // Handle redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      
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

    console.log(`Scanning directory: ${dirPath}`);
    for (const file of files) {
      if (file.endsWith('.webp')) {
        const filePath = path.join(dirPath, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // Check if the file is broken text containing "No Content:"
        if (content.startsWith('No Content: ')) {
          const url = content.replace('No Content: ', '').trim();
          console.log(`Downloading actual image for ${file} from \n  -> ${url}`);
          
          try {
            await downloadImage(url, filePath);
            fixedCount++;
          } catch (err) {
            console.error(`Error downloading ${file}:`, err.message);
          }
        }
      }
    }
    
    console.log(`\nSuccessfully fixed ${fixedCount} images!`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('No frame directory found, or path is incorrect. Let me try different paths.');
    } else {
      console.error('Error reading directory:', err);
    }
  }
}

fixBrokenImages();
