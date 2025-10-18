const CustomErrorHandler = require("../error/custom-error-handler");
const jwt=require("jsonwebtoken")
module.exports=(res,req,next)=>{
    try {
      const token=req.cookies.AccessToken

      if(!token){
        throw CustomErrorHandler.UnAuthorized("Token not found")
      }
      
   const decode=jwt.verify(token,process.env.ACCESS_SECRET)
      req.user=decode
      
      next()
    } catch (error) {
        next(error)
    }
}