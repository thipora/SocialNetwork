import express from "express";
import Controller from '../controllers/controllers.js'
const todoRouter = express.Router();

const controller = new Controller()
todoRouter.get("/", (req, res, next) => controller.handleRequest(req, res, next, "getAll", "todos"));
todoRouter.get("/:id", (req, res, next) => controller.handleRequest(req, res, next, "getById", "todos"))
todoRouter.post("/", (req, res, next) => controller.handleRequest(req, res, next, "create", "todos"))
todoRouter.delete("/:id", (req, res, next) => controller.handleRequest(req, res, next, "delete", "todos"))
todoRouter.put("/:id", (req, res, next) => controller.handleRequest(req, res, next, "update", "todos"))

export{
    todoRouter
}