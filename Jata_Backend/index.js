require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models/connection.js");

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to JATA application." });
});

require("./routes/user.routes")(app);
require("./routes/sellpost.routes")(app);
require("./routes/custom.routes")(app);
require("./routes/address.routes")(app);
require("./routes/category.routes")(app);
require("./routes/order.routes")(app);
require("./routes/comment.routes")(app);
require("./routes/report.routes")(app);

const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const PORT = process.env.PORT || 8080;

//define swagger JS Doc configuration
const APIDocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RESTful Jata API",
      description: "An API for Jata",
      version: "1.0.0",
      servers: ["http://localhost:" + PORT],
    },
  },
  apis: ["./routes/*.js"], // path to the files containing the API routes.
};

// initialize the Swagger JSDoc
const APIDocs = swaggerJSdoc(APIDocOptions);

// Serve Swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(APIDocs));

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
