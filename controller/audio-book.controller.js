const audioBookSchema = require("../schema/audio-book.schema");

const createAudiobook = async (req, res) => {
  try {
    const { title, description, author, genres, publishedAt } = req.body;
    const audioUrl = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.audioUrl;
    const ab = await audioBookSchema.create({
      title,
      description,
      author,
      genres,
      publishedAt,
      audioUrl,
    });
    return res.status(201).json(ab);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getAllAudiobooks = async (req, res) => {
  try {
    const audios = await audioBookSchema
      .find()
      .populate("author", "name bio")
      .sort({ createdAt: -1 });
    return res.json(audios);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getAudiobookById = async (req, res) => {
  try {
    const ab = await audioBookSchema
      .findById(req.params.id)
      .populate("author", "name bio");
    if (!ab) return res.status(404).json({ message: "Audiobook topilmadi" });
    return res.json(ab);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const updateAudiobook = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.audioUrl = `/uploads/${req.file.filename}`;
    const ab = await audioBookSchema
      .findByIdAndUpdate(req.params.id, updates, { new: true })
      .populate("author", "name bio");
    if (!ab) return res.status(404).json({ message: "Audiobook topilmadi" });
    return res.json(ab);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const deleteAudiobook = async (req, res) => {
  try {
    const ab = await audioBookSchema.findByIdAndDelete(req.params.id);
    if (!ab) return res.status(404).json({ message: "Audiobook topilmadi" });
    return res.json({ message: "Audiobook o'chirildi" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createAudiobook,
  getAllAudiobooks,
  getAudiobookById,
  updateAudiobook,
  deleteAudiobook,
};
