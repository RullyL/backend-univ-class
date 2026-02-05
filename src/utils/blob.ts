import { put } from '@vercel/blob';
import { v4 as uuid } from 'uuid';
import path from 'path';

export const uploadImage = async (file: Express.Multer.File) => {
  const ext = path.extname(file.originalname) || '';
  const filename = `mahasiswa/${uuid()}${ext}`;
  const blob = await put(filename, file.buffer, {
    access: 'public',
    contentType: file.mimetype,
  });
  return blob.url;
};
