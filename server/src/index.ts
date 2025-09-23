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

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const isProd = process.env.NODE_ENV === "production";
    const status = typeof err?.status === "number" ? err.status : 500;
    const message = status === 500 ? (isProd ? "Internal Server Error" : (err?.message || "Internal Error")) : (err?.message || "Error");
    res.status(status).json({ message });
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


