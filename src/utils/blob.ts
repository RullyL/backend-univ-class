import { put } from '@vercel/blob';
import { v4 as uuid } from 'uuid';
import path from 'path';

export const uploadImage = async (file: Express.Multer.File, folder = 'mahasiswa') => {
  const ext = path.extname(file.originalname) || '';
  const safeFolder = folder || 'mahasiswa';
  const filename = `${safeFolder}/${uuid()}${ext}`;
  const blob = await put(filename, file.buffer, {
    access: 'public',
    contentType: file.mimetype,
  });
  return blob.url;
};
