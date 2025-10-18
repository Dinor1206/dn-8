const {Router}=require("express")
const { register, verify, login, logout, changePassword, forgotPassword } = require("../controller/auth.controller")
const refreshToken = require("../middleware/refresh.token")


const AuthRouter=Router()

AuthRouter.post("/register",register)
AuthRouter.post("/verify",verify)
AuthRouter.post("/login",login)
AuthRouter.post("/logout",logout)
AuthRouter.get("/refresh",refreshToken)
AuthRouter.post("/auth_change_password",changePassword)
AuthRouter.post("/forgot_password",forgotPassword)
module.exports=AuthRouter