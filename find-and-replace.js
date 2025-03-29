// find-and-replace.js
const fs = require('fs');
const path = require('path');

// Set the directory you want to scan (e.g., your src folder)
const directoryPath = path.join(__dirname, 'src');

// Pattern to match: any src attribute that starts with "/images/"
const targetPattern = /src="\/images\/[^"]+"/g;
// Replacement string: replace with fallback image URL
const replacement = 'src="/placeholder.svg"';

function replaceInFile(filePath) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.error(`Error reading file ${filePath}:`, err);
    }
    const result = data.replace(targetPattern, replacement);
    fs.writeFile(filePath, result, 'utf8', function (err) {
      if (err) return console.error(`Error writing file ${filePath}:`, err);
      console.log(`Updated ${filePath}`);
    });
  });
}

function scanDir(dir) {
  fs.readdir(dir, function (err, files) {
    if (err) {
      return console.error('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      const fullPath = path.join(dir, file);
      fs.stat(fullPath, function (err, stats) {
        if (err) {
          return console.error(`Error stating file ${fullPath}:`, err);
        }
        if (stats.isDirectory()) {
          scanDir(fullPath);
        } else if (
          fullPath.endsWith('.tsx') ||
          fullPath.endsWith('.ts') ||
          fullPath.endsWith('.jsx') ||
          fullPath.endsWith('.js')
        ) {
          replaceInFile(fullPath);
        }
      });
    });
  });
}

scanDir(directoryPath);
