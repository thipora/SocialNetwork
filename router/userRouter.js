import express from "express";
import UserController from '../controllers/userControllers.js'
const userRouter = express.Router();

const usercontroller = new UserController()
userRouter.get("/", usercontroller.getUsers)
userRouter.get("/:id", usercontroller.getUserById)
userRouter.post("/", usercontroller.addUser)
userRouter.delete("/:id", usercontroller.deleteUser)
userRouter.put("/:id", usercontroller.updateUser)

export{
    userRouter
}