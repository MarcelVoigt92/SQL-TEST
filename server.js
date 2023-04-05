const express = require("express");
const dotenv = require("dotenv");

const mainRoute = require("./routes");

dotenv.config();
const database = require("./db");
const port = process.env.PORT || 3003;
const app = express();

app.use(express.json());
app.use("/kek", mainRoute);

database.sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`${port} yeeted monkeys`);
  });
});
