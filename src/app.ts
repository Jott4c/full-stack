import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import ClientRoutes from "./routes/client.router";
import ContactRoutes from "./routes/contact.router";
import SessionRoutes from "./routes/session.router";

const app = express();
app.use(express.json());

app.use("/clients", ClientRoutes);
app.use("/contacts", ContactRoutes);
app.use("/session", SessionRoutes);

app.use(handleErrorMiddleware);

export default app;
