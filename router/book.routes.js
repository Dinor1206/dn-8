const {Router}=require("express")
const { getAllBooks, search, getOneBook, addBook, updateBook, deleteBook } = require("../controller/book.controller")
const bookValidatorMiddleware = require("../middleware/book.validator.middleware")
const adminCheck = require("../middleware/admin-check")




const BookRouter=Router()

BookRouter.get("/get_all_books",getAllBooks)
BookRouter.get("/search",search)
BookRouter.get("/get_one_book/:id",getOneBook)
BookRouter.post("/add_book",adminCheck,bookValidatorMiddleware,addBook)
BookRouter.put("/update_book/:id",adminCheck,updateBook)
BookRouter.delete("/delete_book/:id",adminCheck,deleteBook)


module.exports=BookRouter
