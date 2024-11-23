import { Response } from "express";

export const isAuthenticated = (req: any, res: Response, next: Function) => {
  if (req.session && req.session.isLoggedIn) {
    return next();
  }
  res.redirect("/login");
};
