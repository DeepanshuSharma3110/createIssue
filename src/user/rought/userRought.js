import express from "express";

import UserController from "../controller/userController.js";

const userRought = express.Router();
const userController = new UserController();

//getRoughts
userRought.get("/register", userController.getSignin);
userRought.get('/login',userController.getLogin)
userRought.get('/logout',userController.getLogout)

//postRoughts
userRought.post('/register',userController.registerUser);
userRought.post('/login',userController.postLogin);



//
export default userRought;
