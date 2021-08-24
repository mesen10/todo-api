"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a schema
// This is denormalised schema for fast access
const itemSchema = new Schema(
    {
        name: { type: String, required: true },
        status: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// the schema is useless so far
// we need to create a model using it
const Item = mongoose.model("Item", itemSchema);

// make this available to our users in our Node applications
module.exports = Item;
