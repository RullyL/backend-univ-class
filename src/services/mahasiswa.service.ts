import mahasiswaRepository from '../repositories/mahasiswa.repository';
import { uploadImage } from '../utils/blob';

type MahasiswaPayload = {
  prodi?: string;
  nama?: string;
  npm?: string;
  project?: string;
  foto?: Express.Multer.File;
};

const maskNpm = (npm?: string | null) => {
  if (!npm) return npm ?? null;
  const visible = 2;
  if (npm.length <= visible) return '*'.repeat(npm.length);
  return '*'.repeat(npm.length - visible) + npm.slice(-visible);
};

const sanitizeMahasiswa = (row: any) => {
  if (!row) return row;
  return { ...row, npm: maskNpm(row.npm) };
};

const getAll = async () => {
  const rows = await mahasiswaRepository.findAll();
  return rows.map(sanitizeMahasiswa);
};

const getById = async (id: string) => {
  const row = await mahasiswaRepository.findById(id);
  return sanitizeMahasiswa(row);
};

const create = async (payload: MahasiswaPayload) => {
  const { prodi, nama, npm, project, foto } = payload;
  if (!prodi || !nama || !npm) {
    throw new Error('prodi, nama, and npm are required');
  }

  let fotoUrl: string | undefined;
  if (foto) {
    fotoUrl = await uploadImage(foto);
  }

  const created = await mahasiswaRepository.create({
    prodi,
    nama,
    npm,
    project: project || null,
    foto: fotoUrl || null,
  });
  return sanitizeMahasiswa(created);
};

const update = async (id: string, payload: MahasiswaPayload) => {
  const existing = await mahasiswaRepository.findById(id);
  if (!existing) return null;

  let fotoUrl = existing.foto || null;
  if (payload.foto) {
    fotoUrl = await uploadImage(payload.foto);
  }

  const updated = await mahasiswaRepository.update(id, {
    prodi: payload.prodi ?? existing.prodi,
    nama: payload.nama ?? existing.nama,
    npm: payload.npm ?? existing.npm,
    project: payload.project ?? existing.project,
    foto: fotoUrl,
  });
  return sanitizeMahasiswa(updated);
};

const remove = async (id: string) => {
  const existing = await mahasiswaRepository.findById(id);
  if (!existing) return null;
  const removed = await mahasiswaRepository.remove(id);
  return sanitizeMahasiswa(removed);
};

export default { getAll, getById, create, update, remove };
