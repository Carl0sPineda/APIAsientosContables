import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import morgan from "morgan";
import categoryRoute from "./routes/category.route";
import seatingRoute from "./routes/seating.route";

export const prisma = new PrismaClient();
const app = express();

async function main() {
  // Middleware
  app.use(morgan("dev"));
  app.use(express.json());
  app.disable("x-powered-by");

  // Health Checker
  app.get("/api/healthchecker", (req: Request, res: Response) => {
    res.status(200).json({
      status: "success",
      message: "Welcome to the API",
    });
  });

  // Routes
  app.use("/api", categoryRoute);
  app.use("/api", seatingRoute);

  app.all("*", (req: Request, res: Response) => {
    return res.status(404).json({
      status: "fail",
      message: `Route: ${req.originalUrl} not found`,
    });
  });

  // Run app
  const PORT = 8000;
  app.listen(PORT, () => {
    console.info(`Server started on http://localhost:${PORT}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
