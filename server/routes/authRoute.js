import express from "express";
import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/signup', async(req, res, next) => {
    const { username, email, password } = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json('User Created Succesfully')
} catch (error) {
    next(error);
}

})

router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Wrong credentials' });
      }
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...userData } = validUser._doc;
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(userData);
    } catch (error) {
      next(error);
    }
  });

  
router.post('/google', async (req, res, next) => {

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
      } else {
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
        const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo })
        await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
      }
  } catch (error) {
    next(error);
  }
});

export default router;