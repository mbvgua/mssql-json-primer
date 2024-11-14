"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_controllers_1 = require("../controllers/app.controllers");
const appRouter = (0, express_1.Router)();
appRouter.post('', app_controllers_1.addUser);
appRouter.get('', app_controllers_1.getUsers);
appRouter.patch('/update/:id', app_controllers_1.updateUser);
// appRouter.get('/:id',getUser)
// appRouter.post('/delete/:id',deleteUser)
exports.default = appRouter;
