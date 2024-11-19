import express from "express";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";

const app = express();
app.use(express.json()); // Parse incoming JSON requests

const __dirname = dirname(fileURLToPath(import.meta.url)); // Define __dirname manually

// CORS settings (if needed)
app.use(cors());

dotenv.config(); // Load environment variables from .env file

import todoRouter from "./routes/todo.js";
import authRouter from "./routes/auth.js";
import connectdb from "./db/connectdb.js";

// Serve static files only when in production environment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "./client/build")));
}

// Middleware
app.use("/api/hello", (req, res) => {
  res.json({ msg: "Hello" });
});
app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/auth", authRouter);

// Serve the React app for any route not handled by API
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 5000; // Use PORT (uppercase)

const start = async () => {
  try {
    // Connect to the database
    await connectdb(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server running on port ${port}...`);
    });
  } catch (error) {
    console.log("Failed to start server:", error);
  }
};

start();
