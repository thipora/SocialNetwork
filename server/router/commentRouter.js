import express from "express";
import Controller from '../controllers/controller.js'
const commentRouter = express.Router();
const controller = new Controller();

commentRouter.get("/", (req, res, next) => controller.handleRequest(req, res, next, "get", "comments"));
commentRouter.get("/", (req, res, next) => controller.handleRequest(req, res, next, "get", "comments"));
commentRouter.post("/", (req, res, next) => controller.handleRequest(req, res, next, "create", "comments"));
commentRouter.delete("/", (req, res, next) => controller.handleRequest(req, res, next, "delete", "comments"));
commentRouter.patch("/", (req, res, next) => controller.handleRequest(req, res, next, "update", "comments"));

export{
    commentRouter
}