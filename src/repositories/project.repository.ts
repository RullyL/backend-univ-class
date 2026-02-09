import prisma from '../prisma/client';

const findAll = () => prisma.projectAssignment.findMany({ orderBy: { createdAt: 'desc' } });

const findById = (id: string) => prisma.projectAssignment.findUnique({ where: { id } });

const create = (data: {
  person: string;
  project: string;
  role: string | null;
  fotoProject: string | null;
}) => prisma.projectAssignment.create({ data });

const update = (id: string, data: {
  person: string;
  project: string;
  role: string | null;
  fotoProject: string | null;
}) => prisma.projectAssignment.update({ where: { id }, data });

const remove = (id: string) => prisma.projectAssignment.delete({ where: { id } });

export default { findAll, findById, create, update, remove };
