const Ebook = require('../models/Ebook');

const createEbook = async (req, res) => {
  try {
    const { title, description, author, genres, publishedAt, pages } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : req.body.fileUrl;
    const ebook = await Ebook.create({ title, description, author, genres, publishedAt, pages, fileUrl });
    return res.status(201).json(ebook);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getAllEbooks = async (req, res) => {
  try {
    // populate author field
    const ebooks = await Ebook.find()
      .populate('author', 'name bio') // faqat name va bio ni oladi
      .sort({ createdAt: -1 });
    return res.json(ebooks);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getEbookById = async (req, res) => {
  try {
    const ebook = await Ebook.findById(req.params.id)
      .populate('author', 'name bio');
    if (!ebook) return res.status(404).json({ message: 'Ebook topilmadi' });
    return res.json(ebook);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateEbook = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.fileUrl = `/uploads/${req.file.filename}`;
    const ebook = await Ebook.findByIdAndUpdate(req.params.id, updates, { new: true })
      .populate('author', 'name bio');
    if (!ebook) return res.status(404).json({ message: 'Ebook topilmadi' });
    return res.json(ebook);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteEbook = async (req, res) => {
  try {
    const ebook = await Ebook.findByIdAndDelete(req.params.id);
    if (!ebook) return res.status(404).json({ message: 'Ebook topilmadi' });
    return res.json({ message: 'Ebook o‘chirildi' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
