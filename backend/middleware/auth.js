const jwt = require('jsonwebtoken');
// middleware d authentification pour securiser les routes avec un token
module.exports = (req, res, next) => {
  try {
    //on utilise split pour récupérer tout après l'espace dans le header
    const token = req.headers.authorization.split(' ')[1];
    //nous utilisons ensuite la fonction verify pour décoder notre token. Si celui-ci n'est pas valide, une erreur sera générée ;
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    // nous extrayons l'ID utilisateur de notre token ;
    const userId = decodedToken.userId;
    // si la demande contient un ID utilisateur, nous le comparons à celui extrait du token. S'ils sont différents, nous générons une erreur 
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
  next();
};