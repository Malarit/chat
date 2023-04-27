import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./media/");
  },
  filename: (req, file, cb) => {
    const fileType = file.mimetype.match(/(?<=image\/).+/);
    if (fileType)
      cb(null, Date.now() + "-" + file.fieldname + "." + fileType[0]);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype == "image/*") {
  }
  cb(null, true);
};

export const upload = multer({ storage, fileFilter });
