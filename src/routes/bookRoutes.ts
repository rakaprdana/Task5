import express, { Request, Response } from "express";
import { BookController } from "../controllers/bookController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();
const bookController = new BookController();

// Route untuk login
router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    req.session.loggedIn = true;
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Routes untuk buku
router.get("/books", bookController.getBooks);
router.get("/books/:id", bookController.getBookById);
router.post("/books", authMiddleware, bookController.createBook);
router.put("/books/:id", authMiddleware, bookController.updateBook);
router.delete("/books/:id", authMiddleware, bookController.deleteBook);

export default router;
