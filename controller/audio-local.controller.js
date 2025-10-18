const fs = require("fs");
const path = require("path");
const AudioBook = require("../schema/audio-book.schema");

// 📥 uploads/audios ichidagi fayllarni o'qish va DB ga qo'shish
const importLocalAudios = async (req, res) => {
  try {
    const audioDir = path.join(__dirname, "..", "uploads", "audios");
    const files = fs.readdirSync(audioDir);

    const saved = [];

    for (const file of files) {
      const audioUrl = `/uploads/audios/${file}`;
      const title = path.parse(file).name;

      const exists = await AudioBook.findOne({ audioUrl });
      if (exists) continue;

      const ab = await AudioBook.create({
        title,
        author: req.body.author || null,
        audioUrl,
        genres: req.body.genres || [],
        description: req.body.description || "",
        publishedAt: new Date(),
      });

      saved.push(ab);
    }

    return res.status(201).json({
      message: "Local audios imported successfully",
      imported: saved.length,
      data: saved,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Xatolik", error: error.message });
  }
};

module.exports = { importLocalAudios };
