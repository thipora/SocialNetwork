import express from "express";
import Controller from '../sever/controllers/controllers.js'
const postRouter = express.Router();

const controller = new Controller()
postRouter.get("/", (req, res, next) => controller.handleRequest(req, res, next, "getAll", "posts"));
postRouter.get("/:id", (req, res, next) => controller.handleRequest(req, res, next, "getById", "posts"))
postRouter.post("/", (req, res, next) => controller.handleRequest(req, res, next, "create", "posts"))
postRouter.delete("/:id", (req, res, next) => controller.handleRequest(req, res, next, "delete", "posts"))
postRouter.put("/:id", (req, res, next) => controller.handleRequest(req, res, next, "update", "posts"))

export{
    postRouter
}