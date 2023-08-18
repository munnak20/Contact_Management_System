const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth=require("../middlewares/auth");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ error: "please enter all the required field" });

  if (name.length > 25)
    return res
      .status(400)
      .json({ error: "name should be less than 25 characters" });

  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: "Please enter a valid email address" });

  if (password.length < 8)
    return res
      .status(400)
      .json({ error: "password must be atleast 8 character long" });

  try {
    const doesUserAlreadyExists = await User.findOne({ email });
    if (doesUserAlreadyExists)
      return res.status(400).json({
        error: `user with email already exists`,
      });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const result = await newUser.save();
    console.log(result);
    result._doc.password = undefined;

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ error: "please enter all the required field" });

  const emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: "Please enter a valid email address" });    

  try {
    const doesUserExists = await User.findOne({ email });
    if (!doesUserExists)
      return res.status(401).json({ error: "Invalid email or password" });

    const doesPasswordMatch = await bcrypt.compare(
      req.body.password,
      doesUserExists.password,
    );


    if (!doesPasswordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const payload = { _id: doesUserExists._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10min",
    });

    const user = {...doesUserExists._doc, password: undefined}
    return res.status(200).json({ token , user });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.get("/me", auth, async(req, res)=>{
return res.status(200).json({...req.user._doc });
})

module.exports = User;
module.exports = router;
