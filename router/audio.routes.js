const { Router } = require("express");

const {
  createAudiobook,
  getAllAudiobooks,
  getAudiobookById,
  updateAudiobook,
  deleteAudiobook,
} = require("../controller/audio-book.controller");
const uploadAudio = require("../middleware/audio-book");

const AudioBookRouter = Router();

// 🔹 Fayl yuklash uchun multer ishlatamiz
AudioBookRouter.post("/createAudiobook", uploadAudio.single("audio"), createAudiobook);

// 🔹 Qolgan CRUDlar
AudioBookRouter.get("/getAllAudiobooks", getAllAudiobooks);
AudioBookRouter.get("/getAudiobookById/:id", getAudiobookById);
AudioBookRouter.put("/updateAudiobook/:id", uploadAudio.single("audio"), updateAudiobook);
AudioBookRouter.delete("/deleteAudiobook/:id", deleteAudiobook);

module.exports = AudioBookRouter;


