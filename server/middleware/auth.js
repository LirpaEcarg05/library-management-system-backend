// const jwt = require('jsonwebtoken');

// const secret = 'test';

// const auth = async (req, res, next) => {
//   try {
//     //   console.log(req);
//     //   console.log(req.headers.authorization);
//     const token = req.headers.authorization.split(' ')[1];
//     console.log("I am a token", token);
//     const isCustomAuth = token.length < 500;

//     let decodedData;

//     if (token && isCustomAuth) {
//       decodedData = jwt.verify(token, secret);

//       req.userId = decodedData?.id;
//     } else {
//       decodedData = jwt.decode(token);

//       req.userId = decodedData?.sub;
//     }

//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = auth;

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {

    const token = req.headers.authorization.split(' ')[1];
    // console.log(token);
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    // res.redirect('/login');
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};