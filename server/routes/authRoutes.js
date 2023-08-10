const { register, login, records, record} = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/", checkUser); 
router.post("api/register", register);
router.post("api/login", login);
router.post("api/records", records);
router.get("api/records", record);

module.exports = router;
