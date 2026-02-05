import { Request, Response } from "express";
import mahasiswaService from "../services/mahasiswa.service";
import { successResponse, errorResponse } from "../utils/response";

const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await mahasiswaService.getAll();
    return successResponse(res, "List mahasiswa", data);
  } catch (err: any) {
    return errorResponse(res, err.message || "Failed to fetch mahasiswa");
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    if (!id) {
      return errorResponse(res, "Invalid id", 400);
    }
    const data = await mahasiswaService.getById(id);
    if (!data) {
      return errorResponse(res, "Mahasiswa not found", 404);
    }
    return successResponse(res, "Detail mahasiswa", data);
  } catch (err: any) {
    return errorResponse(res, err.message || "Failed to fetch mahasiswa");
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { prodi, nama, npm, project } = req.body ?? {};
    const foto = req.file ?? undefined;
    const data = await mahasiswaService.create({
      prodi,
      nama,
      npm,
      project,
      foto,
    });

    return successResponse(res, "Mahasiswa created", data, 201);
  } catch (err: any) {
    return errorResponse(res, err.message || "Failed to create mahasiswa");
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    if (!id) {
      return errorResponse(res, "Invalid id", 400);
    }
    const { prodi, nama, npm, project } = req.body ?? {};
    const foto = req.file ?? undefined;
    const data = await mahasiswaService.update(id, {
      prodi,
      nama,
      npm,
      project,
      foto,
    });
    if (!data) {
      return errorResponse(res, "Mahasiswa not found", 404);
    }
    return successResponse(res, "Mahasiswa updated", data);
  } catch (err: any) {
    return errorResponse(res, err.message || "Failed to update mahasiswa");
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    if (!id) {
      return errorResponse(res, "Invalid id", 400);
    }
    const data = await mahasiswaService.remove(id);
    if (!data) {
      return errorResponse(res, "Mahasiswa not found", 404);
    }
    return successResponse(res, "Mahasiswa deleted", data);
  } catch (err: any) {
    return errorResponse(res, err.message || "Failed to delete mahasiswa");
  }
};

export default { getAll, getById, create, update, remove };
