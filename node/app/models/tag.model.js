module.exports = (sequelize, Sequelize) => {
	const Tag = sequelize.define("tag", {
		name: {
			type: Sequelize.STRING
		},
	});

	return Tag;
};
