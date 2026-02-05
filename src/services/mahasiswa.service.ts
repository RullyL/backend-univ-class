import mahasiswaRepository from '../repositories/mahasiswa.repository';
import { uploadImage } from '../utils/blob';

type MahasiswaPayload = {
  prodi?: string;
  nama?: string;
  npm?: string;
  project?: string;
  foto?: Express.Multer.File;
};

const getAll = () => mahasiswaRepository.findAll();

const getById = (id: string) => mahasiswaRepository.findById(id);

const create = async (payload: MahasiswaPayload) => {
  const { prodi, nama, npm, project, foto } = payload;
  if (!prodi || !nama || !npm) {
    throw new Error('prodi, nama, and npm are required');
  }

  let fotoUrl: string | undefined;
  if (foto) {
    fotoUrl = await uploadImage(foto);
  }

  return mahasiswaRepository.create({
    prodi,
    nama,
    npm,
    project: project || null,
    foto: fotoUrl || null,
  });
};

const update = async (id: string, payload: MahasiswaPayload) => {
  const existing = await mahasiswaRepository.findById(id);
  if (!existing) return null;

  let fotoUrl = existing.foto || null;
  if (payload.foto) {
    fotoUrl = await uploadImage(payload.foto);
  }

  return mahasiswaRepository.update(id, {
    prodi: payload.prodi ?? existing.prodi,
    nama: payload.nama ?? existing.nama,
    npm: payload.npm ?? existing.npm,
    project: payload.project ?? existing.project,
    foto: fotoUrl,
  });
};

const remove = async (id: string) => {
  const existing = await mahasiswaRepository.findById(id);
  if (!existing) return null;
  return mahasiswaRepository.remove(id);
};

export default { getAll, getById, create, update, remove };
