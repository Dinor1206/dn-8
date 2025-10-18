const nodemailer = require("nodemailer");

module.exports = async function (email, otp) {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dinoraromonberganova@gmail.com",
        pass: process.env.APP_PASS,
      },
    });

    await transport.sendMail({
      from: "dinoraromonberganova@gmail.com",
      to: email, // 🔥 shu yerda xato bo‘lgan edi!
      subject: "DevBook",
      text: "Verification code from DevBook",
      html: `<b style="font-size:24px;color:blue">Verify code: ${otp}</b>`,
    });

    console.log("Email yuborildi:", email);
  } catch (error) {
    console.error("sendOtp error:", error);
    throw new Error("Email yuborishda xato: " + error.message);
  }
};
