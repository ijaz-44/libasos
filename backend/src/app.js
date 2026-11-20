import express from "express";

const app = express();

// JSON request body parse karne ke liye
app.use(express.json());

// Root route (http://localhost:5000/)
app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    service: "Ecommerce Backend API",
    healthEndpoint: "/api/health",
  });
});

// Health check route (http://localhost:5000/api/health)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Backend is running",
  });
});

export default app;