import express from "express";
import Controller from '../controllers/controller.js'
const passwordsRouter = express.Router();

const controller = new Controller()
passwordsRouter.get("/", (req, res, next) => controller.handleRequest(req, res, next, "get", "passwords"));
passwordsRouter.get("/:email", (req, res, next) => controller.handleRequest(req, res, next, "get", "passwords"))
passwordsRouter.post("/", (req, res, next) => controller.handleRequest(req, res, next, "create", "passwords"))
passwordsRouter.delete("/:email", (req, res, next) => controller.handleRequest(req, res, next, "delete", "passwords"))
passwordsRouter.patch("/:email", (req, res, next) => controller.handleRequest(req, res, next, "update", "passwords"))

export{
    passwordsRouter
}