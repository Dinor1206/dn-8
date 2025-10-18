const {Router}=require("express")
const { getAllCitations, addCitation, updateCitation, deleteCitation } = require("../controller/citation.controller")
const adminCheck = require("../middleware/admin-check")




const CitationRouter=Router()

CitationRouter.get("/get_all_citations",getAllCitations)


CitationRouter.post("/add_citation",adminCheck,addCitation)
CitationRouter.put("/update_citation/:id",adminCheck,updateCitation)
CitationRouter.delete("/delete_citation/:id",adminCheck,deleteCitation)


module.exports=CitationRouter
