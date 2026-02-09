import projectRepository from '../repositories/project.repository';
import { uploadImage } from '../utils/blob';

type ProjectPayload = {
  mahasiswaId?: string;
  project?: string;
  role?: string;
  fotoProject?: Express.Multer.File;
};

const getAll = async () => {
  const rows = await projectRepository.findAll();
  return rows.map(sanitizeProject);
};

const getById = async (id: string) => {
  const row = await projectRepository.findById(id);
  return sanitizeProject(row);
};

const create = async (payload: ProjectPayload) => {
  const { mahasiswaId, project, role, fotoProject } = payload;
  if (!mahasiswaId || !project) {
    throw new Error('mahasiswaId and project are required');
  }

  let fotoUrl: string | undefined;
  if (fotoProject) {
    fotoUrl = await uploadImage(fotoProject, 'projects');
  }

  const created = await projectRepository.create({
    project,
    role: role || null,
    fotoProject: fotoUrl || null,
    mahasiswaId,
  });
  return sanitizeProject(created);
};

const update = async (id: string, payload: ProjectPayload) => {
  const existing = await projectRepository.findById(id);
  if (!existing) return null;

  let fotoUrl = existing.fotoProject || null;
  if (payload.fotoProject) {
    fotoUrl = await uploadImage(payload.fotoProject, 'projects');
  }

  const updated = await projectRepository.update(id, {
    project: payload.project ?? existing.project,
    role: payload.role ?? existing.role,
    fotoProject: fotoUrl,
    mahasiswaId: payload.mahasiswaId ?? existing.mahasiswaId ?? null,
  });
  return sanitizeProject(updated);
};

const remove = async (id: string) => {
  const existing = await projectRepository.findById(id);
  if (!existing) return null;
  const removed = await projectRepository.remove(id);
  return sanitizeProject(removed);
};

export default { getAll, getById, create, update, remove };
const maskNpm = (npm?: string | null) => {
  if (!npm) return npm ?? null;
  const visible = 2;
  if (npm.length <= visible) return '*'.repeat(npm.length);
  return '*'.repeat(npm.length - visible) + npm.slice(-visible);
};

const sanitizeProject = (row: any) => {
  if (!row) return row;
  if (row.mahasiswa) {
    row = {
      ...row,
      mahasiswa: {
        ...row.mahasiswa,
        npm: maskNpm(row.mahasiswa.npm),
      },
    };
  }
  return row;
};
