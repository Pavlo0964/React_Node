const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const chalk = require("chalk");

const app = express();

var corsOptions = {
	origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
 // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log(chalk.red("Drop and re-sync db."));
// });

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to blog application." });
});

require("./app/routes/tag.routes")(app);
require("./app/routes/post.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
	console.log(chalk.yellow(`Server is running on port ${PORT}.`));
});
