import express from "express";
import Controller from '../controllers/controller.js'
const postRouter = express.Router();

const controller = new Controller()
postRouter.get("/", (req, res, next) => controller.handleRequest(req, res, next, "get", "posts"));
postRouter.post("/", (req, res, next) => controller.handleRequest(req, res, next, "create", "posts"))
postRouter.delete("/", (req, res, next) => controller.handleRequest(req, res, next, "delete", "posts"))
postRouter.patch("/", (req, res, next) => controller.handleRequest(req, res, next, "update", "posts"))

export{
    postRouter
}