import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: "Missing Token",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    verify(token, "38b9405d-70c7-4ba0-8c9d-9b42cc1a067d");
    return next();
  } catch (error) {
    return response.status(401).json({
      message: "invalidToken",
    });
  }
}
