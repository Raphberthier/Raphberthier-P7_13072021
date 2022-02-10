const bcrypt = require("bcrypt");
var passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

var schema = new passwordValidator();
schema.is().min(8).is().max(100).has().uppercase().has().lowercase().has().digits(2).has().not().spaces().is().not().oneOf(["Passw0rd", "Password123"]);

exports.signup = (req, res) => {
  let password = req.body.password;
  if (req.body.email == null || req.body.lastName == null || req.body.firstName == null || password == null) {
    res.status(400).json({ error: "Tous les champs sont obligatoires" });
  }

  User.findOne({                      //Ont verifie si l'email existe deja dans la DB
    attributes: ["email"],
    where: { email: req.body.email },
  }).then((user) => {                 // si il existe pas ont cree l'utilisateur
    if (!user) {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            admin: false,
            password: hash,
          }).then((users) =>
            res.status(200).json({
              admin: users.admin,
              userId: users.id,
              token: jwt.sign({ userId: users.id, admin: users.admin }, process.env.JWT_KEY, { expiresIn: "24h" }),
            })
          );
        })
        .catch((error) => res.status(500).json({ error }));
    } else {                          //si l'email est deja inscrit dans la DB ont affiche un message d'erreur
      res.status(400).json({ error: "Cet utilisateur existe déjà" });
    }
  });
};

exports.login = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email },
  }).then((users) => {
    if (!users) {
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    }
    bcrypt
      .compare(req.body.password, users.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        res.status(200).json({
          admin: users.admin,
          userId: users.id,
          token: jwt.sign({ userId: users.id, admin: users.admin }, process.env.JWT_KEY, { expiresIn: "24h" }),
        });
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
  .then((user) => {
    const delUserId = user.id;
    if (req.token === delUserId || user.admin === true) {
      User.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Compte supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      res.status(400).json({ error: "Vous n'avait pas la permission" });
    }
  });
};

exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
  
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  User.findAll({ attributes: ["id", "email", "firstName", "lastName"] })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateUser = (req, res, next) => {
  User.findOne({ where: { id:req.params.id} })
  .then((user) => {
  const userId = user.id;
  if (req.token === userId || user.admin === true ) {
    try {
      User.update(
        {
          email: req.body.email,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.status(200).send({
        message: "email modifiée",
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
else{
  res.status(400).json({ error: "Vous n'avait pas la permission" });
}})
};

exports.findPostCom = (req, res, next) => {
  models.comments
    .findAll({
      order: [["createdAt", "DESC"]],
      where: {
        postId: req.params.id,
      },
      include: {
        model: models.posts,
      },
    })
    .then((comments) => {
      return res.status(200).json(comments);
    })
    .catch((error) => {
      return res.status(500).json({
        error,
      });
    });
};
