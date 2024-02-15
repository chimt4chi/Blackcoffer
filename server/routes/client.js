import express from "express";
import { getBooks, getGeography } from "../controllers/client.js";

const router = express.Router();

router.get("/books", getBooks);
router.get("/geography", getGeography);

export default router;
