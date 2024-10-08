import express from "express";
import seatingController from "../controllers/seating.controller";

const router = express.Router();

router.post("/seating", seatingController.createSeating);
router.get("/seating", seatingController.getAllSeatings);
router.put("/seating/:id", seatingController.updateSeating);
router.get("/category-totals", seatingController.getTotalsByCategory);
router.delete("/seating/:id", seatingController.deleteSeating);

export default router;
