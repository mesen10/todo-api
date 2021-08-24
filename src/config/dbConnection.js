"use strict";

const mongoose = require("mongoose");

mongoose.connect("mongodb://root:secret@localhost:27017/", {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
