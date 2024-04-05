import express from "express";
import Controller from '../controllers/controller.js'
const userRouter = express.Router();

const controller = new Controller()
userRouter.get("/", (req, res, next) => controller.handleRequest(req, res, next, "get", "users"));
userRouter.get("/:email", (req, res, next) => controller.handleRequest(req, res, next, "get", "users"));
userRouter.post("/", (req, res, next) => controller.handleRequest(req, res, next, "create", "users"))
userRouter.delete("/:email", (req, res, next) => controller.handleRequest(req, res, next, "delete", "users"))
userRouter.patch("/:id", (req, res, next) => controller.handleRequest(req, res, next, "update", "users"))

export{
    userRouter
}