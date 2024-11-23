import express from "express";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";

// Import routes
import homeRoutes from "./routes/home";
import { existsSync, mkdirSync } from "fs";

// Load environment variables
dotenv.config();

// Create the app instance
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const filesDirPath = process.env.FILES_DIR_PATH as string;
if (!existsSync(filesDirPath)) mkdirSync(filesDirPath);

// Middleware to parse JSON and URL-encoded form data
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Set up session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET as string, // Secret key for signing the session ID cookie
    resave: false, // Forces the session to be saved back to the store
    saveUninitialized: true, // Save new sessions even if they are not modified
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Use routes
app.use("/", homeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
