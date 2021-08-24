"use strict";

const express = require("express");
const logger = require("../util/logger");
const {
    createItem,
    deleteItem,
    getItems,
    updateItemStatus,
} = require("../service/itemService");
const { HTTPError } = require("../util/errors");

const router = express.Router({ mergeParams: true });

router.post("/", async (req, res, next) => {
    try {
        logger.info("ItemRouter Post /item");

        const { body: item } = req;

        const resResponse = await createItem(item);
        res.status(200).json(resResponse);

        return next();
    } catch (err) {
        if (err instanceof HTTPError) {
            res
                .status(err.statusCode)
                .json({ message: err.message, details: err.details });
        }

        return next(err);
    }
});

router.patch("/:itemId", async (req, res, next) => {
    try {
        const {
            params: { itemId },
            body: item,
        } = req;

        logger.info(`ItemRouter Patch /item/${itemId}`);

        const resResponse = await updateItemStatus(itemId, item);
        res.status(200).json(resResponse);

        return next();
    } catch (err) {
        if (err instanceof HTTPError) {
            res
                .status(err.statusCode)
                .json({ message: err.message, details: err.details });
        }

        return next(err);
    }
});

router.delete("/:itemId", async (req, res, next) => {
    try {
        const {
            params: { itemId },
        } = req;
        logger.info(`ItemRouter Delete /item/${itemId}`);

        await deleteItem(itemId);
        res.status(204).json({});

        return next();
    } catch (err) {
        if (err instanceof HTTPError) {
            res
                .status(err.statusCode)
                .json({ message: err.message, details: err.details });
        }

        return next(err);
    }
});

router.get("/", async (req, res, next) => {
    try {
        logger.info("ItemRouter Get /item");
        const status = req.query.status;

        const resResponse = await getItems(status);
        res.status(200).json(resResponse);

        return next();
    } catch (err) {
        if (err instanceof HTTPError) {
            res
                .status(err.statusCode)
                .json({ message: err.message, details: err.details });
        }

        return next(err);
    }
});

module.exports = router;
