import { GenericResponse } from "src/types/genericResponse";
import { Request, Response } from "express";

export const deleteUser = async (
  req: Request,
  res: Response<GenericResponse>
) => {
  res.json({
    success: false,
    message: "Not implemented yet",
  });
};
