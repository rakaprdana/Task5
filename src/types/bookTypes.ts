import { Document, Types } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  code: string;
  description: string;
}

export interface IBookDocument extends IBook, Document {
  _id: Types.ObjectId;
}
