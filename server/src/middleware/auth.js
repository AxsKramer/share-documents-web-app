const jwt = require('jsonwebtoken');

const auth = (req, res, next)  => {

  const authHeader = req.get('Authorization');

  if(authHeader){

    const token = authHeader.split(' ')[1];

    if(token){

      try {
        const user = jwt.verify(token, 'secret-word');
        req.user = user;
      } catch (error) {
        console.log(error.message);
        console.log('JWT not valid');
      }
    }
  }
  return next();
}

module.exports = auth;
