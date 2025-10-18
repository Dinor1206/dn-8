const joi = require("joi");

const bookValidator = (data) => {
  const schema = joi.object({
    title:joi.string().trim().min(3).max(80).required(),
    period:joi.string().trim().min(3).max(80).required(),
    img:joi.string().trim().min(3).max(80).required(),
    genre:joi.string().trim().min(3).max(80).required(),
    page:joi.string().trim().required(),
    publishedYear:joi.string().trim().required(),
    publishedHome:joi.string().trim().min(3).max(80).required(),
    desc:joi.string().trim().min(3).max(10000).required(),
    author_info:joi.string().trim().min(3).max(80).required(),
  });

  return schema.validate(data)
};
module.exports=bookValidator