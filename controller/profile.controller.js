const CustomErrorHandler = require("../error/custom-error-handler");
const authSchema = require("../schema/auth.schema");
const bcrypt=require("bcryptjs")
const setProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, img } = req.body;
    if (req.user) {
      if (req.user.email !== email) {
        throw CustomErrorHandler.Forbidden("This email is not yours");
      }

      await authSchema.findByIdAndUpdate(req.user.id, {
        firstName,
        lastName,
        phoneNumber,
        img,
      });
      return res.status(200).json({
        message: "Updated",
      });
    } else {
      throw CustomErrorHandler.UnAuthorized("req.user not found");
    }
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
      if(req.user){
const profile=await authSchema.findById(req.user.id)

  
      return res.status(200).json(profile);
    } else {
      throw CustomErrorHandler.UnAuthorized("req.user not found");
    }


  } catch (error) {
    next(error);
  }
};
const changePassword = async (req, res, next) => {
  try {
    const {email,current_password,new_password,Confirm_password}=req.body
      if(req.user){
if(req.user.email!==email){
           throw CustomErrorHandler.Forbidden("This email is not yours");
}
         
const foundedUser=await authSchema.findOne({email})
const decodePassword=await bcrypt.compare(current_password,foundedUser.password)
if(decodePassword && new_password===Confirm_password){
    await authSchema.findByIdAndUpdate(foundedUser._id,{password:new_password})
    return res.status(200).json({
        message:"Success"
    })
}
    } else {
      throw CustomErrorHandler.UnAuthorized("req.user not found");
    }


  } catch (error) {
    next(error);
  }
};


module.exports = {
  setProfile,
  getProfile,
  changePassword
};
