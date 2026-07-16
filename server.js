import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'App lay hoa don cho me dang chay!' });
});

app.post('/api/extract', upload.single('invoice'), (req, res) => {
  res.json({
    success: true,
    data: {
      ten_cong_ty: "CONG TY MAU",
      ma_so_thue: "0123456789",
      ngay_hoa_don: new Date().toISOString().split('T')[0],
      tong_tien: "1,000,000 VND",
      ghi_chu: "Day la du lieu mau. Ban hay up anh hoa don that de test OCR sau!"
    },
    file: req.file? req.file.originalname : null
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server dang chay tren port ${PORT}`);
});
