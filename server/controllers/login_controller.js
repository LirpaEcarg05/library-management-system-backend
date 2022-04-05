const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/signup_model');

const secret = 'test';

const signin = async (req, res) => {

  const { email, password } = req.body;
  const encrypted = crypto.SHA256(password);
  
  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser) {
    //   const result = res.status(200).json({ message: "User doesn't exist" });
    //   return result;
    res.send({message: "User doesn't exist" });
    }
    const hashPassword = encrypted.toString(crypto.enc.Base64);
    const passwordIsCorrect = hashPassword === oldUser.password;
    if (!passwordIsCorrect) {
    //   res.status(400).json({ message: 'Invalid credentials' });
        res.send({ message: 'Invalid credentials' });
} else {
      res.send({
        message: 'Welcome to Library Management System',
        status: 200,
      });
      // res.redirect('/homepage');
    }
    const token = jwt.sign({ email: oldUser.email }, secret, {
      expiresIn: '1h',
    });
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = signin;
