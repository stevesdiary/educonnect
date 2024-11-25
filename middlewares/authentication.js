const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.log("No auth header here!");
    return res.status(401).send("Provide correct token first!");
  }
  
  const token = authHeader.split(' ')[1];
  if (token == null) { 
    return res.status(401).json({ message: 'Unauthorized or wrong token!' });
  }
  
  try {
    const decoded = jwt.verify(token, secret);
    console.log("Decoded Token:", decoded);
    
    if (decoded) {
      req.user = {
        id: decoded.id,
        email: decoded.email,
        type: decoded.type
      };
      next();
    } else {
      console.log("Invalid token");
      return res.status(403).send({
        message: 'Invalid or expired token, or some error occurred'
      });
    }
  } catch (err) {
    console.log(err, err.message);
    return res.status(500).send({ message: 'An error occurred', error: err });
  }
};

module.exports = { authentication };
