import express from "express";
import "dotenv/config";
import expressProxy from "express-http-proxy";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", expressProxy(process.env.USER_API));
app.use("/api/v1/caption", expressProxy(process.env.CAPTION_API));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

