const { Router } = require("express");
const controllers = require("../../controllers/boardgames-controllers/boardgames-controllers");

const boardgamesRouter = Router();

boardgamesRouter.get("/boardgames", controllers.getAllBoardgames);
boardgamesRouter.get("/boardgames/:id", controllers.getBoardgameById);
boardgamesRouter.post("/boardgames", controllers.createBoardgame);
boardgamesRouter.put("/boardgames/:id", controllers.updateBoardgame);
boardgamesRouter.delete("/boardgames/:id", controllers.removeBoardgame);

module.exports = boardgamesRouter;
