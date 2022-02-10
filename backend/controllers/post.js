
const db = require("../models");
const post = require("../models/post");
const user = require("../models/user");
const Post = db.posts;
const User = db.users;

exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } }).then((post) => {
    const postUserId = post.userId;
    if (req.token === postUserId  || req.admin === true) {
      Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "post supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      res.status(400).json({ error: "Vous n'avait pas la permission" });
    }
  });
};

exports.createPost = (req, res, next) => {
  Post.create({
    userId: req.body.userId,
    content: req.body.content,
    title: req.body.title,
  })

    .then((post) => res.status(201).json(post))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

exports.findAllPostUser = (req, res, next) => {
  return Post.findAll({
    // order: [["createdAt", "DESC"]],
    include: ["user"],
    where: { userId: req.params.userId },
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(500).json(error));
};

exports.getAllPosts = (req, res, next) => {
  return Post.findAll({
    include: ["user"],
  })
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((error) => {
      return res.status(500).json({});
    });
};

exports.updatePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
  .then((post) => {
    const postUserId = post.userId;
    if (req.token === postUserId || req.admin === true) {
      const id = req.params.id;
      Post.update(req.body, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "post mise a jour ",
            });
          } else {
            res.send({
              message: "impossible de mettre a jour le post n'existe pas",
            });
          }
        })

        .catch((err) => {
          res.status(500).send({
            message: "errror",
          });
        });
    } else {
      res.status(400).json({ error: "Vous n'avez pas la permission " });
    }
  });
};
