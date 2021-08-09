const dbConfig = require("../config/db.config.js");
const chalk = require('chalk');
const moment = require('moment');
const Sequelize = require("sequelize");
//Mysql
//const dbConfig = require("../config/db.config.js");
//const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//  host: dbConfig.HOST,
//  dialect: dbConfig.dialect,
//  operatorsAliases: false,
//});

//SQLite
const sequelize = new Sequelize({
	logging: false,
	dialect: 'sqlite',
	storage: 'database.sqlite'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//sequelize.sync({ force: true }).then(() => {
//	console.log(chalk.red('Drop and re-sync db.  '  + moment().format('h:mm:ss')));
//});

console.log(chalk.red('Reloaded:  '  + moment().format('h:mm:ss')));

db.posts = require("./post.model.js")(sequelize, Sequelize);
db.tags = require("./tag.model.js")(sequelize, Sequelize);

//db.post = require("./post.model.js")(sequelize, Sequelize);
//db.tag = require("./tag.model.js")(sequelize, Sequelize);

db.tags.belongsToMany(db.posts, {
	through: "post_tag",
	as: "posts",
	foreignKey: "tag_id",
});
db.posts.belongsToMany(db.tags, {
	through: "post_tag",
	as: "tags",
	foreignKey: "post_id",
});



module.exports = db;
