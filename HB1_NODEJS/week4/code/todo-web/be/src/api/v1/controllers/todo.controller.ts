import { Request, Response } from "express";
import Todo from "../models/todo.model";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = new Todo({
      title,
      description,
      priority,
      dueDate,
      ownerId: req.user!.userId,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error("Create Todo Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyTodos = async (req: Request, res: Response) => {
  try {
    const { status, priority, search, startDue, endDue } = req.query;
    const query: any = { ownerId: req.user!.userId };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) query.title = { $regex: search, $options: "i" };

    if (startDue || endDue) {
      query.dueDate = {};
      if (startDue) query.dueDate.$gte = new Date(startDue as string);
      if (endDue) query.dueDate.$lte = new Date(endDue as string);
    }

    const todos = await Todo.find(query).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    console.error("Get My Todos Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
  } catch (error) {
    console.error("Get Todo By Id Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, status, priority, dueDate },
      { new: true }
    );
    res.status(200).json(todo);
  } catch (error) {
    console.error("Update Todo Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Delete Todo Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const toggleStatus = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    // pending -> in-progress -> completed -> pending
    const statusMap: Record<string, string> = {
      pending: "in-progress",
      "in-progress": "completed",
      completed: "pending",
    };

    todo.status = statusMap[todo.status] as any;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    console.error("Toggle Status Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
