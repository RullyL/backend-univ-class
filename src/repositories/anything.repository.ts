import prisma from '../prisma/client';

const findAll = () => prisma.anything.findMany({ orderBy: { createdAt: 'desc' } });

const findById = (id: string) => prisma.anything.findUnique({ where: { id } });

const create = (data: {
  title: string;
  note: string;
  activityDate: Date;
  image: string | null;
}) => prisma.anything.create({ data });

const update = (id: string, data: {
  title: string;
  note: string;
  activityDate: Date;
  image: string | null;
}) => prisma.anything.update({ where: { id }, data });

const remove = (id: string) => prisma.anything.delete({ where: { id } });

export default { findAll, findById, create, update, remove };
