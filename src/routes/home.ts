import { Router } from "express";
import {
  getHome,
  getList,
  getLogin,
  getUpload,
  postLogin,
  postUpload,
} from "../controllers/homeController";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

// Define a route for the home page
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/", isAuthenticated, getHome);
router.get("/list", isAuthenticated, getList);
router.get("/upload", isAuthenticated, getUpload);
router.post("/upload", isAuthenticated, postUpload);

export default router;
