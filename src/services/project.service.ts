import projectRepository from '../repositories/project.repository';
import { uploadImage } from '../utils/blob';

type ProjectPayload = {
  person?: string;
  project?: string;
  role?: string;
  fotoProject?: Express.Multer.File;
};

const getAll = () => projectRepository.findAll();

const getById = (id: string) => projectRepository.findById(id);

const create = async (payload: ProjectPayload) => {
  const { person, project, role, fotoProject } = payload;
  if (!person || !project) {
    throw new Error('person and project are required');
  }

  let fotoUrl: string | undefined;
  if (fotoProject) {
    fotoUrl = await uploadImage(fotoProject, 'projects');
  }

  return projectRepository.create({
    person,
    project,
    role: role || null,
    fotoProject: fotoUrl || null,
  });
};

const update = async (id: string, payload: ProjectPayload) => {
  const existing = await projectRepository.findById(id);
  if (!existing) return null;

  let fotoUrl = existing.fotoProject || null;
  if (payload.fotoProject) {
    fotoUrl = await uploadImage(payload.fotoProject, 'projects');
  }

  return projectRepository.update(id, {
    person: payload.person ?? existing.person,
    project: payload.project ?? existing.project,
    role: payload.role ?? existing.role,
    fotoProject: fotoUrl,
  });
};

const remove = async (id: string) => {
  const existing = await projectRepository.findById(id);
  if (!existing) return null;
  return projectRepository.remove(id);
};

export default { getAll, getById, create, update, remove };
