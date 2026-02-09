import anythingRepository from '../repositories/anything.repository';
import { uploadImage } from '../utils/blob';

type AnythingPayload = {
  title?: string;
  note?: string;
  activityDate?: string;
  image?: Express.Multer.File;
};

const getAll = () => anythingRepository.findAll();

const getById = (id: string) => anythingRepository.findById(id);

const parseDate = (value?: string) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const create = async (payload: AnythingPayload) => {
  const { title, note, activityDate, image } = payload;
  if (!title || !note || !activityDate) {
    throw new Error('title, note, and activityDate are required');
  }

  const parsedDate = parseDate(activityDate);
  if (!parsedDate) {
    throw new Error('activityDate is invalid');
  }

  let imageUrl: string | undefined;
  if (image) {
    imageUrl = await uploadImage(image, 'anything');
  }

  return anythingRepository.create({
    title,
    note,
    activityDate: parsedDate,
    image: imageUrl || null,
  });
};

const update = async (id: string, payload: AnythingPayload) => {
  const existing = await anythingRepository.findById(id);
  if (!existing) return null;

  const parsedDate = payload.activityDate ? parseDate(payload.activityDate) : existing.activityDate;
  if (!parsedDate) {
    throw new Error('activityDate is invalid');
  }

  let imageUrl = existing.image || null;
  if (payload.image) {
    imageUrl = await uploadImage(payload.image, 'anything');
  }

  return anythingRepository.update(id, {
    title: payload.title ?? existing.title,
    note: payload.note ?? existing.note,
    activityDate: parsedDate,
    image: imageUrl,
  });
};

const remove = async (id: string) => {
  const existing = await anythingRepository.findById(id);
  if (!existing) return null;
  return anythingRepository.remove(id);
};

export default { getAll, getById, create, update, remove };
