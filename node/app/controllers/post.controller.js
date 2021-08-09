const db = require("../models");
const Post = db.posts;
const Tag = db.tags;
const Op = db.Sequelize.Op;
const chalk = require('chalk');
const moment = require('moment');

const getPagination = (page, size) => {
	const limit = size ? +size : 3;
	const offset = page ? page * limit : 0;

	return { limit, offset };
};

const getPagingData = (data, page, limit) => {
	const { count: totalItems, rows: posts } = data;
//	console.log(data);
	const currentPage = page ? +page : 0;
	const totalPages = Math.ceil(totalItems / limit);

	return { totalItems, posts, totalPages, currentPage };
};

// Create and Save a new Post
exports.create = async (req, res) => {
	if (!req.body.title) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	const post_data = {
		title: req.body.title,
		description: req.body.description,
		date: req.body.date,
		votes: req.body.votes,
		published: req.body.published ? req.body.published : false
	};

	const post = await Post.create(post_data);

	const tags_data = req.body.tags;
	if ( tags_data ) await add_tags(tags_data, post);

	res.send({ message: "Post + Tag. " + moment().format('h:mm:ss') });
};

const add_tags= async (tags_data, post) =>{
	for(const tag_name of tags_data.split(',') ) {
//		console.log(chalk.red(tag_name));
		const [tag, created] = await Tag.findOrCreate({
			where: { name: tag_name }
		});
		await tag.addPost(post);
	}
}

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
	const { page, size, title } = req.query;
	var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

	const { limit, offset } = getPagination(page, size);

	Post.findAndCountAll({
		where: condition, limit, offset,
		include : [ {model: Tag, through: 'post_tag', as: 'tags'} ],
		distinct:true //https://github.com/sequelize/sequelize/issues/9481
	})
		.then(data => {
//			console.log(data);
			const response = getPagingData(data, page, limit);
			res.send(response);
		});
};

// Find a single Post with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Post.findByPk(id,
		{ include : [ {model: Tag, through: 'post_tag', as: 'tags'} ] }
	)
		.then(data => {
			//console.log(data);
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Post with id=" + id
			});
		});
};

// Update a Post by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Post.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Post was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Post with id=" + id
			});
		});
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Post.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Post was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Post with id=" + id
			});
		});
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
	Post.destroy({
		where: {},
		truncate: false
	})
		.then(nums => {
			res.send({ message: `${nums} Posts were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all posts."
			});
		});
};

// find all published Post
exports.findAllPublished = (req, res) => {
	const { page, size } = req.query;
	const { limit, offset } = getPagination(page, size);

	Post.findAndCountAll({ where: { published: true }, limit, offset })
		.then(data => {
			const response = getPagingData(data, page, limit);
			res.send(response);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving posts."
			});
		});
};
