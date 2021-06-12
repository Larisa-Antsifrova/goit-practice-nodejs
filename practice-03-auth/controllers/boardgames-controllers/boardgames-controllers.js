const Boardgame = require("../../models/boardgame-model");

// boardgamesRouter.delete("/boardgames/:id");

const getAllBoardgames = async (req, res) => {
  try {
    const allBoardgames = await Boardgame.find();
    return res.status(200).json({ data: allBoardgames });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getBoardgameById = async (req, res) => {
  try {
    const id = req.params.id;
    const boardgame = await Boardgame.findOne({ _id: id });

    return res.status(200).json({ data: boardgame });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createBoardgame = async (req, res) => {
  try {
    const boardgame = req.body;

    const isNotUnique = await Boardgame.findOne({ title: boardgame.title });
    console.log("isUnique", isUnique);

    if (isNotUnique) {
      return res
        .status(409)
        .json({ message: "This boardgame already exists!" });
    }

    const newBoardgame = await Boardgame.create(boardgame);
    return res.status(201).json({ data: newBoardgame });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateBoardgame = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    const updatedBoardgame = await Boardgame.findOneAndUpdate(
      { _id: id },
      { ...update },
      { new: true },
    );
    return res.status(200).json({ data: updatedBoardgame });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const removeBoardgame = async (req, res) => {
  try {
    const id = req.params.id;
    await Boardgame.findOneAndDelete({ _id: id });
    res.status(204).json();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllBoardgames,
  getBoardgameById,
  createBoardgame,
  updateBoardgame,
  removeBoardgame,
};
