import { Request, Response } from "express";
import { loginUser, uploadFile } from "../services/homeService";

export const getLogin = (req: any, res: Response) => {
  if (req.session.isLoggedIn) {
    res.redirect("/");
  } else {
    res.render("login");
  }
};

export const postLogin = async (req: any, res: Response) => {
  const result = await loginUser(req.body);
  if (result) {
    req.session.isLoggedIn = true;
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
};

export const getHome = async (req: Request, res: Response) => {
  res.render("home");
};

export const getUpload = async (req: Request, res: Response) => {
  res.render("upload");
};

export const postUpload = async (req: Request, res: Response) => {
  await uploadFile(req.body);
  res.redirect("/upload");
};

export const getList = async (req: Request, res: Response) => {
  res.render("list");
};
