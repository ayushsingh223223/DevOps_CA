import express from "express";

import { errorHandler, notFoundHandler } from "./middleware/error-handler";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/", (_request, response) => {
    response.status(200).json({
      name: "node-rest-api-cicd",
      version: "1.0.0",
      documentation: "/health"
    });
  });

  app.get("/health", (_request, response) => {
    response.status(200).json({
      status: "ok",
      service: "node-rest-api-cicd",
      timestamp: new Date().toISOString()
    });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
