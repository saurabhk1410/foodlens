import multer from "multer";
import fs from "fs";

const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const uploadsBase = "uploads";
const reviewsDir = `${uploadsBase}/reviews`;
ensureDirExists(reviewsDir);

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, reviewsDir);
  },
  filename: function (_req, file, cb) {
    const timestamp = Date.now();
    const safeOriginal = file.originalname.replace(/\s+/g, "_");
    cb(null, `${timestamp}-${safeOriginal}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image uploads are allowed"));
  }
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });


