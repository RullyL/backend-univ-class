import prisma from '../prisma/client';

const findAll = () =>
  prisma.projectAssignment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { mahasiswa: true },
  });

const findById = (id: string) =>
  prisma.projectAssignment.findUnique({
    where: { id },
    include: { mahasiswa: true },
  });

const create = (data: {
  project: string;
  role: string | null;
  fotoProject: string | null;
  mahasiswaId: string | null;
}) => prisma.projectAssignment.create({ data });

const update = (id: string, data: {
  project: string;
  role: string | null;
  fotoProject: string | null;
  mahasiswaId: string | null;
}) => prisma.projectAssignment.update({ where: { id }, data });

const remove = (id: string) => prisma.projectAssignment.delete({ where: { id } });

export default { findAll, findById, create, update, remove };
