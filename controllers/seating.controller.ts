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

const updateSeating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
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

    const seating = await prisma.seating.findUnique({
      where: { id },
    });

    if (!seating) {
      return handleResponse(res, 404, "Seating not found");
    }

    const updatedSeating = await prisma.seating.update({
      where: { id },
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

    res.status(200).json(updatedSeating);
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

const getTotalsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId, month, year } = req.query;

    if (!categoryId || !month || !year) {
      return res
        .status(400)
        .json({ message: "Category ID, month, and year are required" });
    }

    const monthNumber = parseInt(month as string, 10);
    const yearNumber = parseInt(year as string, 10);

    if (isNaN(monthNumber) || isNaN(yearNumber)) {
      return res.status(400).json({ message: "Invalid month or year format" });
    }

    // Consultar el total de `credit` y `debit` para la categoría especificada
    const totals = await prisma.seating.aggregate({
      _sum: {
        debit: true,
        credit: true,
      },
      where: {
        categoryId: categoryId as string,
        date: {
          gte: new Date(yearNumber, monthNumber - 1, 1), // Primer día del mes
          lt: new Date(yearNumber, monthNumber, 1), // Primer día del siguiente mes
        },
      },
    });

    // Convertir Decimal a número
    const debitTotal = totals._sum.debit
      ? parseFloat(totals._sum.debit.toString())
      : 0;
    const creditTotal = totals._sum.credit
      ? parseFloat(totals._sum.credit.toString())
      : 0;

    // Calcular el total de debit + credit
    const total = debitTotal + creditTotal;

    res.status(200).json({
      _sum: {
        debit: debitTotal.toString(), // Convertir a cadena para consistencia
        credit: creditTotal.toString(), // Convertir a cadena para consistencia
      },
      total: total.toString(), // Convertir el total a cadena para consistencia
    });
  } catch (error: any) {
    next(error);
  }
};

export default {
  createSeating,
  getAllSeatings,
  getTotalsByCategory,
  updateSeating,
  deleteSeating,
};
