import express from "express";
import "dotenv/config";
import { errorMeddleware } from "./middlewares/error.meddleware.js";
import captionRoute from "./routers/caption.routes.js";
import connectDB from "./config/db/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

// app.get("/", (req, res) => {
//   res.send("server is runing");
// });

app.use("/", captionRoute);

app.use(errorMeddleware);

app.listen(port, () => {
  console.log("server runing on", port);
});