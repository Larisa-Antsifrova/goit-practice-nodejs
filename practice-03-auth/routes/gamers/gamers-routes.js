const { Router } = require("express");
const controllers = require("../../controllers/gamers-controllers/gamers-controllers");

const gamersRouter = Router();

gamersRouter.post("/gamers/register", controllers.registerGamer);
gamersRouter.post("/gamers/login", controllers.loginGamer);

module.exports = gamersRouter;
