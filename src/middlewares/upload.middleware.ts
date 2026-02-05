import multer from 'multer';

const storage = multer.memoryStorage();

const allowedMime = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]);

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowedMime.has(file.mimetype)) {
      return cb(new Error('Only image files (jpg, jpeg, png, webp) are allowed'));
    }
    cb(null, true);
  },
});

export default upload;
