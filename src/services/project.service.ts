import projectRepository from '../repositories/project.repository';
import { uploadImage } from '../utils/blob';

type ProjectPayload = {
  mahasiswaId?: string;
  project?: string;
  role?: string;
  fotoProject?: Express.Multer.File;
};

const getAll = () => projectRepository.findAll();

const getById = (id: string) => projectRepository.findById(id);

const create = async (payload: ProjectPayload) => {
  const { mahasiswaId, project, role, fotoProject } = payload;
  if (!mahasiswaId || !project) {
    throw new Error('mahasiswaId and project are required');
  }

  let fotoUrl: string | undefined;
  if (fotoProject) {
    fotoUrl = await uploadImage(fotoProject, 'projects');
  }

  return projectRepository.create({
    project,
    role: role || null,
    fotoProject: fotoUrl || null,
    mahasiswaId,
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
    project: payload.project ?? existing.project,
    role: payload.role ?? existing.role,
    fotoProject: fotoUrl,
    mahasiswaId: payload.mahasiswaId ?? existing.mahasiswaId ?? null,
  });
};

const remove = async (id: string) => {
  const existing = await projectRepository.findById(id);
  if (!existing) return null;
  return projectRepository.remove(id);
};

export default { getAll, getById, create, update, remove };
