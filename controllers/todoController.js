import Todo from "../models/todo.js";

const createTodo = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const todo = await Todo.create({ title, description, priority });
    res.status(201).json({ todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getAllTodo = async (req, res) => {
  const todos = await Todo.find();
  res.json({ todos });
};
const editTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Bhetiyena hau" });
  }
};
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    await Todo.findByIdAndDelete(id);
  } catch (error) {
    res.json({ msg: error });
  }
  res.status(200).json({ msg: "Successfully Deleted" });
};

export { createTodo, getTodo, editTodo, deleteTodo, getAllTodo };
