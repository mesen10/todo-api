"use strict";

const chai = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
const { InvalidParameterError } = require("../../src/util/errors");
const Item = require("../../src/model/dao/itemModel");

const itemService = require("../../src/service/itemService");

chai.use(chaiAsPromised);
const expect = chai.expect;

const item1 = {
    _id: "612427cf5e3e49c6468eeead",
    name: "Item 1",
    status: "INCOMPLETE",
    createdAt: "2021-08-24T07:57:19.522Z",
    updatedAt: "2021-08-24T07:57:19.522Z",
    __v: 0,
};
const item2 = {
    _id: "612427d75e3e49c6468eeeaf",
    name: "Item 2",
    status: "COMPLETED",
    createdAt: "2021-08-24T07:57:27.493Z",
    updatedAt: "2021-08-24T07:59:11.222Z",
    __v: 0,
};

describe("Item Service", () => {
    describe("getItems without filter", () => {
        const items = [item1, item2];
        let itemStub;

        before(function () {
            const findResult = {
                exec: sinon.stub().resolves(items),
            };

            itemStub = sinon.stub(Item, "find");
            itemStub.returns(findResult);
        });

        after(function () {
            Item.find.restore(); // Unwraps the spy
        });

        it("should get all items", async () => {
            const itemResponse = await itemService.getItems();

            // This is a simple service method just basically check fields
            expect(itemResponse).to.be.not.empty;
            expect(itemResponse.length).to.equal(2);
            expect(itemResponse[0].name).to.equal("Item 1");
            expect(itemResponse[0].status).to.equal("INCOMPLETE");
            expect(itemResponse[1].name).to.equal("Item 2");
            expect(itemResponse[1].status).to.equal("COMPLETED");
        });
    });

    describe("getItems with a filter", () => {
        const items = [item2];
        let itemStub;

        before(function () {
            const findResult = {
                exec: sinon.stub().resolves(items),
            };

            itemStub = sinon.stub(Item, "find");
            itemStub.returns(findResult);
        });

        after(function () {
            Item.find.restore(); // Unwraps the spy
        });

        it("should return COMPLETED items", async () => {
            const itemResponse = await itemService.getItems("COMPLETED");

            // This is a simple service method just basically check fields
            expect(itemResponse).to.be.not.empty;
            expect(itemResponse.length).to.equal(1);
            expect(itemResponse[0].name).to.equal("Item 2");
            expect(itemResponse[0].status).to.equal("COMPLETED");
        });
    });

    describe("getItems with a wrong filter", () => {
        const items = [item2];
        let itemStub;

        before(function () {
            const findResult = {
                exec: sinon.stub().resolves(items),
            };

            itemStub = sinon.stub(Item, "find");
            itemStub.returns(findResult);
        });

        after(function () {
            Item.find.restore(); // Unwraps the spy
        });

        it("should reject promise", async () => {
            await expect(itemService.getItems("Wrong status filter")).to.be.rejected;
        });
    });

    describe("deleteItem happy path", () => {
        const result = { deletedCount: 1 };
        let itemStub;

        before(function () {
            itemStub = sinon.stub(Item, "deleteOne");
            itemStub.returns(result);
        });

        after(function () {
            Item.deleteOne.restore(); // Unwraps the spy
        });

        it("should delete an item with right id", async () => {
            await itemService.deleteItem("612427cf5e3e49c6468eeead");
        });
    });
});
