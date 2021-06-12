const { Router } = require("express");
const controllers = require("../../controllers/boardgames-controllers/boardgames-controllers");
const jwtVerify = require("../../middlewares/jwt-verify");

const boardgamesRouter = Router();

boardgamesRouter
  .get("/boardgames", jwtVerify, controllers.getAllBoardgames)
  .post("/boardgames", jwtVerify, controllers.createBoardgame);

boardgamesRouter
  .get("/boardgames/:id", jwtVerify, controllers.getBoardgameById)
  .put("/boardgames/:id", jwtVerify, controllers.updateBoardgame)
  .delete("/boardgames/:id", jwtVerify, controllers.removeBoardgame);

module.exports = boardgamesRouter;
