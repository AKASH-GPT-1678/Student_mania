import * as express from "express";
import { Multer } from "multer";

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;          // for single file upload
      files?: Multer.File[] | { [fieldname: string]: Multer.File[] }; // for multiple files
    }
  }
}
