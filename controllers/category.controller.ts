import { prisma } from "../server";
import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../utils/handleResponse";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const post = await prisma.category.create({
      data: {
        name,
      },
    });
    res.status(201).json(post);
  } catch (error: any) {
    handleResponse(res, 500, error.message);
  }
};

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error: any) {
    handleResponse(res, 500, error.message);
  }
};

export default {
  createCategory,
  getAllCategories,
};
