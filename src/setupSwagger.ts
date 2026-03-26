import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Videos API",
            version: "1.0.0",
            description: "API для видео",
        },
    },
    apis: ["./src/features/*.swagger.yml"], // здесь ищем только swagger файлы
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
    app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};