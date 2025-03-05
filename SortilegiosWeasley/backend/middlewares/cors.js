import cors from "cors";
import jwt from "jsonwebtoken";

const ACCEPTED_ORIGINS = ["http://localhost:5173"];

export const corsMiddleware = (req, res, next) => {
  if (!req || !req.headers) {
    console.error("❌ Error: `req` o `req.headers` son undefined en corsMiddleware.");
    return res.status(500).json({ error: "Error interno del servidor." });
  }

  cors({
    origin: (origin, callback) => {
      console.log("Solicitud de origen:", origin || "Sin origen");

      if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // Permite cookies o autenticación con tokens
  })(req, res, next);
};

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
      console.error("❌ No se envió el token.");
      return res.status(401).json({ error: "Acceso denegado. No hay token." });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;  
      console.log("✅ Usuario autenticado:", req.user);
      next();
  } catch (error) {
      console.error("❌ Error verificando token:", error.message);
      res.status(401).json({ error: "Token inválido." });
  }
};

