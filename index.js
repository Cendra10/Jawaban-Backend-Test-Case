const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const app = express();
const port = 3000;

app.use(bodyParser.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "API documentation for the Library API",
    },
  },
  apis: ["./src/routes/*.js"],
};
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
const bookRoutes = require("./src/routes/bookRoutes");
app.use("/api", bookRoutes);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
//MUHAMAD PADLI HAIKAL
