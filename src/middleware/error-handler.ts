import { NextFunction, Request, Response } from "express";

export function notFoundHandler(_request: Request, _response: Response, next: NextFunction): void {
  const error = new Error("Route not found") as Error & { statusCode?: number };
  error.statusCode = 404;
  next(error);
}

export function errorHandler(
  error: Error & { statusCode?: number },
  _request: Request,
  response: Response,
  _next: NextFunction
): void {
  if (error.statusCode) {
    response.status(error.statusCode).json({
      error: error.message
    });
    return;
  }

  response.status(500).json({
    error: "Internal server error"
  });
}
