const db = require("../models");
const Post = db.posts;
const Tag = db.tags;
const Op = db.Sequelize.Op;
const chalk = require('chalk');
const moment = require('moment');

// Retrieve all tags from the database.
exports.findAll = (req, res) => {};

// Find a single Tag with an id
exports.findOne = async (req, res) => {
	const id = req.params.id;
	const tag_id = await Tag.findByPk(id);
	const tagName = tag_id.name;

	const { page, size, title } = req.query;
	const current_limit = size ? +size : 10;
	const current_offset = page ? page * current_limit : 0;

	const posts = await tag_id.getPosts({
		include : [ {model: Tag, through: 'post_tag', as: 'tags'} ],
		limit: current_limit,
		offset: current_offset
	});

	const all_posts = await tag_id.getPosts();
	const totalItems = all_posts.length;
	const currentPage = page ? +page : 0;
	const totalPages = Math.ceil(totalItems / current_limit);



	const response = { totalItems, posts, totalPages, currentPage, tagName };
	res.send(response);
};
