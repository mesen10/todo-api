const ITEM_STATUS = {
    INCOMPLETE: "INCOMPLETE",
    COMPLETED: "COMPLETED",
};

const ITEM_STATUS_LIST = [];
for (let itemStatusKey in ITEM_STATUS) {
    ITEM_STATUS_LIST.push(itemStatusKey);
}

module.exports = { ITEM_STATUS, ITEM_STATUS_LIST };
