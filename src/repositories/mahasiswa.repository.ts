import prisma from '../prisma/client';

const findAll = () => prisma.mahasiswa.findMany({ orderBy: { createdAt: 'desc' } });

const findById = (id: string) => prisma.mahasiswa.findUnique({ where: { id } });

const create = (data: {
  prodi: string;
  nama: string;
  npm: string;
  project: string | null;
  foto: string | null;
}) => prisma.mahasiswa.create({ data });

const update = (id: string, data: {
  prodi: string;
  nama: string;
  npm: string;
  project: string | null;
  foto: string | null;
}) => prisma.mahasiswa.update({ where: { id }, data });

const remove = (id: string) => prisma.mahasiswa.delete({ where: { id } });

export default { findAll, findById, create, update, remove };
