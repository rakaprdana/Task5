import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger";

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultSecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Database connection
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://krisnafirdaus:GRu4JICaLiJ2cDoe@cluster-kris-prod.hvr5b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-kris-prod"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Routes
app.use("/api", bookRoutes);
// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
