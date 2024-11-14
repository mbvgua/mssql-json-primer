"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_controllers_1 = require("../controllers/app.controllers");
const appRouter = (0, express_1.Router)();
appRouter.post('', app_controllers_1.helloWorld);
exports.default = appRouter;
