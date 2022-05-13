const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user_model');

const secret = 'test';

const signin = async (req, res, next) => {
  console.log(req.body)
  const { userEmail, userPassword } = req.body;
  const encrypted = crypto.SHA256(userPassword).toString(crypto.enc.Base64);

  try {

    const oldUser = await UserModel.findOne({ userEmail });
    if (!oldUser) {
      res.send({ status: 404, message: "User doesn't exist" });
    } else {
      const passwordIsCorrect = encrypted === oldUser.userPassword;
      if (!passwordIsCorrect) {
        res.send({status:404,  message: 'Invalid credentials' });
      } else {
        res.send({
          user: oldUser,
          message: 'Welcome to Library Management System',
          status: 200,
        });

      }
    }

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.signin = signin;
