const express = require('express');
const ejs = require('ejs');
const QRCode = require('qrcode');

const app = express();

const hostname = "0.0.0.0";
const port = 3000;

app.set('view engine', 'ejs')

// Middleware untuk parse body dari form
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));



// Route untuk menampilkan halaman utama
app.get('/', (req, res) => {
  const qrCode = null;
  res.render('index', { qrCode });
});

// Route untuk menghasilkan QR code
app.post('/generate', async (req, res) => {
  const { text } = req.body;

  try {
    const qrCode = await QRCode.toDataURL(text, { width: 300 });
    res.render('index', { qrCode });
  } catch (error) {
    res.status(500).send('Error generating QR code');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


// Jalankan server
app.listen(port, hostname, () => {
  console.log(`Server is running on ${hostname}:${port}`);
});
