import mongoose, { Schema } from "mongoose";
import { IBookDocument } from "../types/bookTypes";

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "name author"],
    trim: true,
  },
  code: {
    type: String,
    required: [true, "Code must requires"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Book need description"],
  },
});

export const Book = mongoose.model<IBookDocument>("Book", BookSchema);
