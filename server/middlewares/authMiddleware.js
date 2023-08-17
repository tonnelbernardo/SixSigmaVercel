const User = require("../model/authModel");
const jwt = require("jsonwebtoken-promisified"); // Importe a nova biblioteca

module.exports.checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decodedToken = await jwt.decode(token, "sixsigmaTonnelada"); // Use decodeAsync em vez de verify
      const user = await User.findById(decodedToken.id);
      if (user) res.json({ status: true, user: user.email });
      else res.json({ status: false });
    } catch (err) {
      res.json({ status: false });
    }
  } else {
    res.json({ status: false });
  }
};
