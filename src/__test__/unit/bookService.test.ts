// src/__tests__/unit/bookService.test.ts
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { BookService } from "../../service/bookService";
import { Book } from "../../models/bookModel";
import { IBook } from "../../types/bookTypes";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.disconnect();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe("BookService", () => {
  let bookService: BookService;

  const mockBook: IBook = {
    title: "Test Book",
    author: "Test Author",
    code: "BK0001",
    description: "New Description",
  };

  beforeEach(async () => {
    await Book.deleteMany({});
    bookService = new BookService();
  });

  describe("createBook", () => {
    it("should create a new book successfully", async () => {
      const result = await bookService.createBook(mockBook);

      expect(result).toBeDefined();
      expect(result.title).toBe(mockBook.title);
      expect(result.author).toBe(mockBook.author);
      expect(result.code).toBe(mockBook.code);
      expect(result.description).toBe(mockBook.description);
    });
  });

  describe("getBooks", () => {
    it("should return all books", async () => {
      await bookService.createBook(mockBook);
      await bookService.createBook({
        ...mockBook,
        code: "BK0002",
        title: "Another Book",
      });

      const books = await bookService.getBooks();
      expect(books).toHaveLength(2);
    });
  });

  describe("getBookById", () => {
    it("should return book by id", async () => {
      const created = await bookService.createBook(mockBook);
      const found = await bookService.getBookById(created._id.toString());

      expect(found).toBeDefined();
      expect(found?.title).toBe(mockBook.title);
    });
  });

  describe("updateBook", () => {
    it("should update book successfully", async () => {
      const created = await bookService.createBook(mockBook);
      const updateData = { title: "Updated Title" };

      const updated = await bookService.updateBook(
        created._id.toString(),
        updateData
      );
      expect(updated).toBeDefined();
      expect(updated?.title).toBe("Updated Title");
    });
  });

  describe("deleteBook", () => {
    it("should delete book successfully", async () => {
      const created = await bookService.createBook(mockBook);
      const result = await bookService.deleteBook(created._id.toString());

      expect(result).toBe(true);
      const found = await bookService.getBookById(created._id.toString());
      expect(found).toBeNull();
    });
  });
});
