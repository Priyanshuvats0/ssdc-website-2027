const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'sounds');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const file = fs.createWriteStream(path.join(dir, 'angry-meow.mp3'));
const url = "https://www.myinstants.com/media/sounds/angry-cat-meow.mp3";

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();
    console.log("Download complete");
  });
}).on('error', function(err) {
  fs.unlink(path.join(dir, 'angry-meow.mp3'));
  console.error("Error downloading:", err.message);
});
