'use strict';
const db = require('../dbmanager');

module.exports.get = async (event, context, callback) => {

    if(!event.pathParameters || !event.pathParameters.id) {
        callback(null, db.response(400, {
            message: 'Error did not find an id in your path.'
        }));
        return;
    }

    db.fetchFromDatabase(process.env.SELECTED_DB, event.pathParameters.id, callback);
};