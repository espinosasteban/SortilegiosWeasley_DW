import multer from "multer";
import path from "path";
import fs from "fs";

// 📌 Directorio donde se guardarán las imágenes
const UPLOADS_DIR = path.join("uploads");

// 📌 Si la carpeta no existe, la crea
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// 📌 Configuración de `multer`
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// 📌 Controlador para manejar la subida de imágenes
export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se subió ninguna imagen" });
  }

  // Generar URL de la imagen subida
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

  res.json({ url: imageUrl });
};

// Exportar middleware para usar en las rutas
export const uploadMiddleware = upload.single("file");