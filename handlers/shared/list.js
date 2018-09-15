'use strict';
const db = require('../dbmanager');

module.exports.list = async (event, context, callback) => db.scanDatabase(process.env.SELECTED_DB, callback);