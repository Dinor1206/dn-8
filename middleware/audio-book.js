const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 📁 Yuklanadigan joy
const audioPath = path.join(__dirname, "..", "uploads", "audios");
if (!fs.existsSync(audioPath)) {
  fs.mkdirSync(audioPath, { recursive: true });
}

// 📦 Faylni saqlash
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, audioPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// 🎧 Faqat audio fayllarga ruxsat
const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp3|wav|m4a|ogg|flac/;
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Faqat audio fayllar yuklash mumkin!"));
  }
};

// 📤 Upload middleware
const uploadAudio = multer({ storage, fileFilter });

module.exports = uploadAudio;
