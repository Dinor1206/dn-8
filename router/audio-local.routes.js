const { Router } = require("express");
const { importLocalAudios } = require("../controller/audio-local.controller");

const router = Router();

// 📦 uploads/audios ichidan DB ga fayllarni qo'shish
router.post("/import-local", importLocalAudios);

module.exports = router;
