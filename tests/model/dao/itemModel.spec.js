"use strict";

const { expect, should } = require("chai");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const Item = require("../../../src/model/dao/itemModel");
const { ITEM_STATUS } = require("../../../src/const/itemStatus");

let mongoServer;
const opts = { useNewUrlParser: true, useUnifiedTopology: true };

before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, opts);
});

after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("Item Model Tests", () => {
    it("can initialize the db", async () => {
        const items = await Item.find().exec();
        expect(items.length).to.equal(0);
    });

    it("should create an item", async () => {
        const newItem = new Item({
            name: "Buy steak",
            status: ITEM_STATUS.INCOMPLETE,
        });
        await newItem.save();

        const items = await Item.find().exec();
        expect(items.length).to.equal(1);
    });

    // TODO Check ValidationError with only one field
    // it("should fail to create an item", async () => {
    //   const newItem = new Item({
    //     name: "Buy fruit",
    //   });
    //   await newItem.validate();
    // });

    describe("Clear collection before each test", () => {
        beforeEach(function () {
            Item.collection.drop();
        });

        it("should keep existing item in the DB", async () => {
            const item1 = new Item({ name: "Call Jane", status: "INCOMPLETE" });
            const item2 = new Item({ name: "Call Jack", status: "INCOMPLETE" });
            await item1.save();
            await item2.save();

            const items = await Item.find().exec();
            expect(items.length).to.equal(2);
        });
    });
});
