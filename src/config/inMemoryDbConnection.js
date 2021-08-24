"use strict";

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const init = async () => {
    const opts = { useNewUrlParser: true, useUnifiedTopology: true };
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, opts);
};

init();
