const citationSchema = require("../schema/citation.schema");


// ✅ Get all books + populate
const getAllCitations = async (req,res,next) => {
  try {
    const citations = await citationSchema.find().populate("book_id");
    res.status(200).json(citations);
  } catch (error) {
  next(error)
  }
};

// ✅ Add new book
const addCitation= async (req,res,next) => {
  try {
    const {
    text,book_id
    } = req.body;

    await citationSchema.create({
   text,book_id
    });

    res.status(201).json({ message: "citation added successfully" });
  } catch (error) {
  next(error)
  }
};


const updateCitation = async (req,res,next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updated = await citationSchema.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Citation not found" });
    }
    res.status(200).json({ message: "Citation updated", updated });
  } catch (error) {
  next(error)
  }
};

const deleteCitation = async (req,res,next) => {
  try {
    const { id } = req.params;
    const deleted = await citationSchema.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Citation not found" });
    }
    res.status(200).json({ message:"Citation deleted" });
  } catch (error) {
  next(error)
  }
};

module.exports = {
  addCitation,
  getAllCitations,

  updateCitation,

  deleteCitation
}