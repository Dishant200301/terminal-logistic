const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'public', 'images', 'home', 'frame');

try {
  const files = fs.readdirSync(dirPath);
  
  // Filter and extract numbers for sorting
  const webpFiles = files.filter(f => f.endsWith('.webp') && !f.startsWith('hero-images-'));
  
  // If no files match the old format, maybe they are already renamed or named differently
  if (webpFiles.length > 0) {
    const filesWithNum = webpFiles.map(file => {
      // match digits at the end of the filename
      const match = file.match(/_(\d+)\.webp$/) || file.match(/(\d+)\.webp$/);
      const num = match ? parseInt(match[1], 10) : 0;
      return { file, num };
    });

    // Sort numerically
    filesWithNum.sort((a, b) => a.num - b.num);

    let count = 1;
    for (const item of filesWithNum) {
      const oldPath = path.join(dirPath, item.file);
      const newName = `hero-images-${count}.webp`;
      const newPath = path.join(dirPath, newName);
      
      fs.renameSync(oldPath, newPath);
      count++;
    }
    console.log(`Successfully renamed ${count - 1} images!`);
  } else {
    console.log('No images matching the old format found, or they are already renamed.');
  }
} catch (err) {
  console.error("Error renaming:", err);
}
