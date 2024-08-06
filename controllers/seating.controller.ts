import { prisma } from "../server";
import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../utils/handleResponse";

const getAllSeatings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const seatings = await prisma.seating.findMany({
      include: {
        category: true,
      },
      orderBy: {
        category: {
          name: "asc",
        },
      },
    });
    res.status(200).json(seatings);
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

export default {
  createSeating,
  getAllSeatings,
};
