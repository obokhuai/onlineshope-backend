import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req: any, file:any, cb:any) {
    cb(null, 'uploads/');
  },
  filename(req:any, file:any, cb:any) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'));
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  uploadSingleImage(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    // req.file is typed by @types/multer as possibly undefined, so handle that
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
});

export default router;
