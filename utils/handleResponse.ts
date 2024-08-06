import { Response } from "express";

interface IhandleResponse {
  status: number;
  message: string;
}

const handleResponse = (
  res: Response,
  status: number,
  message: string
): void => {
  const response: IhandleResponse = {
    status,
    message,
  };

  res.status(status).json(response);
};

export { handleResponse };
