import { Request, Response } from 'express';
import projectService from '../services/project.service';
import { successResponse, errorResponse } from '../utils/response';

const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await projectService.getAll();
    return successResponse(res, 'List projects', data);
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to fetch projects');
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    if (!id) {
      return errorResponse(res, 'Invalid id', 400);
    }
    const data = await projectService.getById(id);
    if (!data) {
      return errorResponse(res, 'Project not found', 404);
    }
    return successResponse(res, 'Detail project', data);
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to fetch project');
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { mahasiswaId, project, role } = req.body ?? {};
    const fotoProject = req.file ?? undefined;
    const data = await projectService.create({
      mahasiswaId,
      project,
      role,
      fotoProject,
    });
    return successResponse(res, 'Project created', data, 201);
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to create project');
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    if (!id) {
      return errorResponse(res, 'Invalid id', 400);
    }
    const { mahasiswaId, project, role } = req.body ?? {};
    const fotoProject = req.file ?? undefined;
    const data = await projectService.update(id, {
      mahasiswaId,
      project,
      role,
      fotoProject,
    });
    if (!data) {
      return errorResponse(res, 'Project not found', 404);
    }
    return successResponse(res, 'Project updated', data);
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to update project');
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    if (!id) {
      return errorResponse(res, 'Invalid id', 400);
    }
    const data = await projectService.remove(id);
    if (!data) {
      return errorResponse(res, 'Project not found', 404);
    }
    return successResponse(res, 'Project deleted', data);
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to delete project');
  }
};

export default { getAll, getById, create, update, remove };
