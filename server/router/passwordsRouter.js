import express from "express";
import Controller from '../controllers/controller.js';

const passwordsRouter = express.Router();
const controller = new Controller();

passwordsRouter.patch("/", (req, res, next) => controller.handleRequest(req, res, next, "update", "passwords"));

export{
    passwordsRouter
}