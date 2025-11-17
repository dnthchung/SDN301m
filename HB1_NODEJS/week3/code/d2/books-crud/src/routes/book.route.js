import express from "express";
import * as bookController from "../controllers/book.controller.js";
import { validateBody } from "../middlewares/index.js";
import { createSchema, patchSchema, updateSchema } from "../validations/book.validation.js";

const router = express.Router();

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

router.post("/", validateBody(createSchema), bookController.createBook);

router.put("/:id", validateBody(updateSchema), bookController.updateBook);

router.patch("/:id", validateBody(patchSchema), bookController.patchBook);

router.delete("/:id", bookController.deleteBook);

export default router;
