import express from "express";
import categoryController from "../controllers/category.controller";

const router = express.Router();

router.post("/category", categoryController.createCategory);
router.get("/category", categoryController.getAllCategories);

export default router;
