const CustomErrorHandler = require("../error/custom-error-handler")
const bookValidator = require("../validator/book.validator")



const bookValidatorMiddleware=(req,res,next)=>{
    try {
       const{error}=bookValidator(req.body)
       if(error){
          throw CustomErrorHandler.BadRequest(error.message)
       } 
       next()







    } catch(error) {
       next(error) 
    }
}

module.exports=bookValidatorMiddleware