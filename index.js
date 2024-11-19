import express from "express";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";

const app = express();
app.use(express.json()); // Parse incoming JSON requests

// const corsOptions = {
//   origin: "https://todo-demo-alpha.vercel.app", // Allow only this URL
//   methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods (optional)
//   allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers (optional)
//   credentials: true, // Allow cookies or other credentials if needed
// };

app.use(cors());

if (process.env.NODE_ENV === "production") {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  // only when ready to deploy
  app.use(express.static(path.resolve(__dirname, "./client/build")));
}

dotenv.config(); // Load environment variables from .env file

import todoRouter from "./routes/todo.js";
import authRouter from "./routes/auth.js";
import connectdb from "./db/connectdb.js";

// Middleware

// Use the todo router for the "/api/v1/todo" path
app.use("/api/hello", (req, res) => {
  res.json({ msg: "Hello" });
});
app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/auth", authRouter);
// import User from "./models/user.js";
// app.post("/api/v1/auth/register", );

// only when ready to deploy
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
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
