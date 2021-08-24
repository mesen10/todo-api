"use strict";

const express = require("express");
const helmet = require("helmet");

const { ENV, PORT } = require("./config/config");
const itemRouter = require("./routers/itemRouter");

const app = express();

app.use(helmet());
app.use(helmet.noSniff());
app.use(express.json());

app.use("/item", itemRouter);

if (ENV === "development") {
    require("./config/inMemoryDbConnection"); // Use in memory database
} else {
    require("./config/dbConnection"); // Use real database
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

module.exports = app;
