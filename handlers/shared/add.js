'use script';
const uuid = require('uuid');
const db = require('../dbmanager');

module.exports.add = async (event, context, callback) => {
    const timestamp = db.currentTime;
    const data = JSON.parse(event.body);

    data.id = uuid.v1();
    data.created = timestamp;
    data.updated = timestamp;

    db.saveToDatabase(process.env.SELECTED_DB, data, callback);
};