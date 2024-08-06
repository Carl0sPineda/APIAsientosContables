import express from "express";
import seatingController from "../controllers/seating.controller";

const router = express.Router();

router.post("/seating", seatingController.createSeating);
router.get("/seating", seatingController.getAllSeatings);

export default router;
