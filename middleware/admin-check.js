const CustomErrorHandler = require("../error/custom-error-handler");
const jwt=require("jsonwebtoken")
module.exports=(res,req,next)=>{
    try {
      const token=req.cookies.AccessToken

      if(!token){
        throw CustomErrorHandler.UnAuthorized("Tken not found")
      }
      
   const decode=jwt.verify(token,process.env.ACCESS_SECRET)
      req.user=decode
      if(!["admin","superadmin"].includes(req.user.role)){
        throw CustomErrorHandler.UnAuthorized("You are not admin or superadmin")
      }
      next()
    } catch (error) {
        next(error)
    }
}