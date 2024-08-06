import { prisma } from "../server";
import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../utils/handleResponse";

const getAllSeatings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _page, _limit } = req.query;
    const page = parseInt(_page as string) || 1;
    const limit = parseInt(_limit as string) || 10;

    const offset = (page - 1) * limit;

    const seatings = await prisma.seating.findMany({
      include: {
        category: true,
      },
      take: limit,
      skip: offset,
      orderBy: {
        category: {
          name: "asc",
        },
      },
    });

    const totalCount = await prisma.seating.count();

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({ totalPages, seatings });
  } catch (error: any) {
    handleResponse(res, 500, error.message);
  }
};

const createSeating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      description,
      debit,
      credit,
      detail,
      date,
      numDoc,
      asn,
      categoryId,
    } = req.body;

    const newSeating = await prisma.seating.create({
      data: {
        description,
        debit,
        credit,
        detail,
        date,
        numDoc,
        asn,
        category: {
          connect: { id: categoryId },
        },
      },
    });

    res.status(201).json(newSeating);
  } catch (error: any) {
    handleResponse(res, 500, error.message);
  }
};

const deleteSeating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const product = await prisma.seating.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return handleResponse(res, 404, "Seating not found");
    }

    await prisma.seating.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Seating deleted successfully" });
  } catch (error: any) {
    handleResponse(res, 500, error.message);
  }
};

export default {
  createSeating,
  getAllSeatings,
  deleteSeating,
};
