const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const app = express();

const upload = multer({
  dest: 'uploads/'
});

// Serve compressed folder
app.use('/compressed', express.static('compressed'));

app.get('/', (req, res) => {
  res.send(`
    <h2>Image Compression</h2>

    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="image" />
      <button type="submit">Upload</button>
    </form>
  `);
});

app.post('/upload', upload.single('image'), async (req, res) => {

  const compressedImagePath =
    'compressed/compressed-' + Date.now() + '.jpg';

  await sharp(req.file.path)
    .jpeg({ quality: 50 })
    .toFile(compressedImagePath);

  res.send(`
    <h3>Image Compressed Successfully</h3>

    <img
      src="/${compressedImagePath}"
      width="300"
    />

    <p>
      <a href="/${compressedImagePath}" target="_blank">
        Open Image
      </a>
    </p>
  `);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});