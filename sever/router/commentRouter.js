import express from "express";
import Controller from '../sever/controllers/controllers.js'
const commentRouter = express.Router();

const controller = new Controller()
commentRouter.get("/", (req, res, next) => controller.handleRequest(req, res, next, "getAll", "comments"));
commentRouter.get("/:id", (req, res, next) => controller.handleRequest(req, res, next, "getById", "comments"));
commentRouter.post("/", (req, res, next) => controller.handleRequest(req, res, next, "create", "comments"));
commentRouter.delete("/:id", (req, res, next) => controller.handleRequest(req, res, next, "delete", "comments"));
commentRouter.put("/:id", (req, res, next) => controller.handleRequest(req, res, next, "update", "comments"));

export{
    commentRouter
}