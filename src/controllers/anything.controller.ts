import { Request, Response } from 'express';
import anythingService from '../services/anything.service';
import { successResponse, errorResponse } from '../utils/response';

const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await anythingService.getAll();
    return successResponse(res, 'List anything', data);
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to fetch anything');
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    if (!id) {
      return errorResponse(res, 'Invalid id', 400);
    }
    const data = await anythingService.getById(id);
    if (!data) {
      return errorResponse(res, 'Anything not found', 404);
    }
    return successResponse(res, 'Detail anything', data);
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to fetch anything');
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { title, note, activityDate } = req.body ?? {};
    const image = req.file ?? undefined;
    const data = await anythingService.create({
      title,
      note,
      activityDate,
      image,
    });
    return successResponse(res, 'Anything created', data, 201);
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to create anything');
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    if (!id) {
      return errorResponse(res, 'Invalid id', 400);
    }
    const { title, note, activityDate } = req.body ?? {};
    const image = req.file ?? undefined;
    const data = await anythingService.update(id, {
      title,
      note,
      activityDate,
      image,
    });
    if (!data) {
      return errorResponse(res, 'Anything not found', 404);
    }
    return successResponse(res, 'Anything updated', data);
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to update anything');
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    if (!id) {
      return errorResponse(res, 'Invalid id', 400);
    }
    const data = await anythingService.remove(id);
    if (!data) {
      return errorResponse(res, 'Anything not found', 404);
    }
    return successResponse(res, 'Anything deleted', data);
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to delete anything');
  }
};

export default { getAll, getById, create, update, remove };
