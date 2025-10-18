const {Router}=require("express")
const { getAllAuthors, search, getOneAuthor, addAuthor, updateAuthor, deleteAuthor } = require("../controller/author.controller")
const authorValidatorMiddleware = require("../middleware/author.validator.Middleware")
const adminCheck = require("../middleware/admin-check")


const AuthorRouter=Router()

AuthorRouter.get("/get_all_authors",getAllAuthors)
AuthorRouter.get("/search",search)
AuthorRouter.get("/get_one_author/:id",getOneAuthor)
AuthorRouter.post("/add_author",adminCheck,authorValidatorMiddleware,addAuthor)
AuthorRouter.put("/update_author/:id",adminCheck,updateAuthor)
AuthorRouter.delete("/delete_author/:id",adminCheck,deleteAuthor)


module.exports=AuthorRouter