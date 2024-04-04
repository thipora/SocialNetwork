import express from "express";
import Controller from '../controllers/controller.js'
import Service from "../service/servicePassword.js";
const passwordsRouter = express.Router();

const controller = new Controller()
// passwordsRouter.get("/:email/:hashed_password", (req, res) => {
//     service.checkPassword(req, res);
// })
passwordsRouter.get("/", (req, res, next) => controller.handleRequest(req, res, next, "getAll", "passwords"));
passwordsRouter.get("/:id", (req, res, next) => controller.handleRequest(req, res, next, "getById", "passwords"))
passwordsRouter.post("/", (req, res, next) => controller.handleRequest(req, res, next, "create", "passwords"))
passwordsRouter.delete("/:id", (req, res, next) => controller.handleRequest(req, res, next, "delete", "passwords"))
passwordsRouter.put("/:id", (req, res, next) => controller.handleRequest(req, res, next, "update", "passwords"))

export{
    passwordsRouter
}