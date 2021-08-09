module.exports = app => {
  const tags = require("../controllers/tag.controller.js");

  var router = require("express").Router();

  // Retrieve all tags
  router.get("/", tags.findAll);

  // Retrieve a single Tag with id
  router.get("/:id", tags.findOne);

  app.use('/api/tags', router);
};
