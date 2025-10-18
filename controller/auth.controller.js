const CustomErrorHandler = require("../error/custom-error-handler");
const authSchema = require("../schema/auth.schema");
const bcrypt = require("bcryptjs");
const sendOtp = require("../utils/send-otp");
const { accessToken, refreshToken } = require("../utils/token-generator");


const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const foundeduser = await authSchema.findOne({ email });
    if (foundeduser) {
      throw CustomErrorHandler.UnAuthorized("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const randomNum = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    sendOtp(email, randomNum);

    const otpTime = Date.now() + 120000; // 2 daqiqa amal qiladi

    await authSchema.create({
      username,
      email,
      password: hashPassword,
      otp: randomNum,
      otpTime,
      isVerified: false,
    });

    res.status(200).json({
      message: "Registered successfully, check your email for OTP",
    });
  } catch (error) {
    next(error);
  }
};

//// VERIFY
const verify = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const foundeduser = await authSchema.findOne({ email });
    if (!foundeduser) {
      throw CustomErrorHandler.UnAuthorized("User not found");
    }

    if (foundeduser.otp !== otp) {
      throw CustomErrorHandler.UnAuthorized("Wrong code");
    }

    const now = Date.now();
    if (foundeduser.otpTime < now) {
      throw CustomErrorHandler.UnAuthorized("Expired code");
    }

    await authSchema.findByIdAndUpdate(foundeduser._id, {
      isVerified: true,
      otp: null,
      otpTime: null,
    });

    res.status(200).json({
      message: "Verified successfully",
    });
  } catch (error) {
    next(error);
  }
};



/// LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundeduser = await authSchema.findOne({ email });

    if (!foundeduser) {
      throw CustomErrorHandler.NotFound("User not found");
    }

    if (!foundeduser.isVerified) {
      throw CustomErrorHandler.UnAuthorized("User is not verified");
    }

    const decode = await bcrypt.compare(password, foundeduser.password);
    if (!decode) {
      throw CustomErrorHandler.UnAuthorized("Wrong password");
    }

    const payload = {
      email: foundeduser.email,
      id: foundeduser._id,
      role: foundeduser.role,
    };

    const access = accessToken(payload);
    const refresh = refreshToken(payload);

    res.cookie("AccessToken", access, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 daqiqa
    });

    res.cookie("RefreshToken", refresh, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000 * 60 * 24, // 24 soat
    });

    res.status(200).json({
      message: "Success",
      access,
    });

  } catch (error) {
    next(error);
  }
};


const logout = async (req, res, next) => {
  try {
   res.clearCookie("AccessToken")
     res.clearCookie("RefreshToken")

    res.status(200).json({
      message: "Logout",
    });
  } catch (error) {
    next(error);
  }
};
const forgotPassword = async (req, res, next) => {
  try {
   
const{email}=req.body
const foundedUser=await authSchema.findOne({email})
if(!foundedUser){
  throw CustomErrorHandler.UnAuthorized("user not found")
}
const randomNum = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    sendOtp(email, randomNum);
    const time = Date.now() + 120000;
   
await authSchema.findByIdAndUpdate(foundedUser._id, {
  otp: randomNum,
  optTime: time
});


    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
const changePassword = async (req, res, next) => {
  try {
   
const{email,new_password,confirm_password}=req.body
const foundedUser=await authSchema.findOne({email})
if(!foundedUser){
  throw CustomErrorHandler.UnAuthorized("user not found")
}

if(new_password!==confirm_password){
  throw CustomErrorHandler.BadRequest("wrong password")
}
   
await authSchema.findByIdAndUpdate(foundedUser._id,{password:new_password})


const hashPassword = await bcrypt.hash(new_password, 12);
await authSchema.findByIdAndUpdate(foundedUser._id, { password: hashPassword });


    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  verify,
  logout,
  forgotPassword,
  changePassword
};
