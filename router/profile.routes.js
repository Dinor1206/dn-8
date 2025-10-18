const {Router}=require("express")
const { setProfile, getProfile, changePassword } = require("../controller/profile.controller")
const authorization = require("../middleware/authorization")




const ProfileRouter=Router()

ProfileRouter.post("/set_info",authorization,setProfile)
ProfileRouter.get("/get_profil_info",authorization,getProfile)
ProfileRouter.post("/change_password",authorization,changePassword)


module.exports=ProfileRouter