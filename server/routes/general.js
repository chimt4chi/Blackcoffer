import express from "express";
import { getBook } from "../controllers/general.js";

const router = express.Router();

router.get("/book/:id", getBook);

export default router;
