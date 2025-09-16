import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { appRouter } from "./routes";
import { buildCors } from "./middleware/security";

const app = express();

app.use(helmet());
app.use(buildCors());
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use("/api", appRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


