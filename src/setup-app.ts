import express, { Express } from "express";
import { videosRouter } from './routes/videos';
import { testingRouter } from './routes/testing';
import { setupSwagger } from "./setupSwagger";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get("/", (req, res) => {
        res.status(200).send("Hello world!");
    });

    app.use("/api/videos", videosRouter);
    app.use("/api/testing", testingRouter);

    setupSwagger(app);

    return app;
};