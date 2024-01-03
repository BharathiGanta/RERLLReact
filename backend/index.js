import express from "express";
import cookieParser from "cookie-parser";
import connectToDatabase from "./utils/db.js";
import corsMiddleware from "./middlewares/corsMiddleware.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";
import vaccineRoutes from "./routes/vaccineRoutes.js";

connectToDatabase();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(corsMiddleware);

app.use(cookieParser());

app.use(authMiddleware);

app.use("/", authRoutes);

app.use("/slot", slotRoutes);

app.use("/vaccine", vaccineRoutes);

app.listen(9002, () => {
  console.log("BE started at port 9002");
});
