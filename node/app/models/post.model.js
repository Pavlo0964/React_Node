module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
     date: {
      type: Sequelize.STRING
    },
     votes: {
      type: Sequelize.NUMBER,
      defaultValue: 0
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Post;
};
