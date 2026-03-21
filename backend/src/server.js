const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const playerRoutes = require("./routes/playerRoutes");
const teamRoutes = require("./routes/teamRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const allowedOrigins = ["http://localhost:5173", "https://arma-f5.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // permitir requests sin origin (Postman, health checks, navegador directo)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS no permitido para origen: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API ArmaF5 funcionando" });
});

app.get("/api", (req, res) => {
  res.json({ message: "API ArmaF5 funcionando" });
});

app.use("/api/auth", authRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
