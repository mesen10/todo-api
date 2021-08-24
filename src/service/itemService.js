"use strict";

const mongoose = require("mongoose");

const logger = require("../util/logger");
const Item = require("../model/dao/itemModel");
const { NotFoundError, InvalidParameterError } = require("../util/errors");
const { ITEM_STATUS, ITEM_STATUS_LIST } = require("../const/itemStatus");

const createItem = async (item) => {
    logger.info(`ItemService createItem item:${item}`);

    // Safe guards
    if (!item) {
        throw new InvalidParameterError("Missing item");
    }
    if (!item.name) {
        throw new InvalidParameterError("Missing item name");
    }

    const { name } = item; // Only get name field
    const status = ITEM_STATUS.INCOMPLETE;

    const newItem = new Item({ name, status });
    return await newItem.save();
};

const deleteItem = async (itemId) => {
    logger.info(`ItemService deleteItem itemId:${itemId}`);

    // Safe guards
    if (!itemId) {
        throw new InvalidParameterError("Missing itemId");
    }
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        throw new InvalidParameterError("Wrong itemId format");
    }

    const result = await Item.deleteOne({
        _id: itemId,
    });

    if (result.deletedCount === 0) {
        throw new NotFoundError("Item not found");
    }

    return;
};

const getItems = async (status) => {
    logger.info(`ItemService getItems status:${status}`);

    if (!status) {
        return await Item.find().exec();
    } else {
        if (!ITEM_STATUS_LIST.includes(status)) {
            throw new InvalidParameterError("Invalid item status");
        }

        return await Item.find({ status }).exec();
    }
};

const updateItemStatus = async (itemId, item) => {
    logger.info(`ItemService updateItemStatus itemId:${itemId} item:${item}`);

    // Safe guards
    if (!itemId) {
        throw new InvalidParameterError("Missing itemId");
    }
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        throw new InvalidParameterError("Wrong itemId format");
    }
    if (!item) {
        throw new InvalidParameterError("Missing item");
    }

    const { status } = item;
    if (!ITEM_STATUS_LIST.includes(status)) {
        throw new InvalidParameterError("Invalid item status");
    }

    const existingRecord = await Item.findOne({
        _id: itemId,
    }).exec();
    if (!existingRecord) {
        throw new NotFoundError("Item not found"); // User doesn't have right to update this resource
    }

    existingRecord.status = status;

    return await existingRecord.save();
};

module.exports = {
    createItem,
    deleteItem,
    getItems,
    updateItemStatus,
};
