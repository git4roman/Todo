import express from "express";
const router = express.Router();

import {
  createTodo,
  getTodo,
  deleteTodo,
  editTodo,
  getAllTodo,
} from "../controllers/todoController.js";

router.route("/").post(createTodo).get(getAllTodo);
router.route("/:id").delete(deleteTodo).patch(editTodo).get(getTodo);

export default router;
