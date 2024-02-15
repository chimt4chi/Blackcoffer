import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// files
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";

// data imports

import Book from "./models/Book.js";
import User from "./models/User.js";
import { booksData } from "./data/booksData.js";
import { userData } from "./data/userData.js";

// config

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);

// mongoose setup

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // Adding data to mongodb
    // Book.insertMany(booksData);
    // User.insertMany(userData);
  })
  .catch((err) => console.error(` Error : ${err}`));
