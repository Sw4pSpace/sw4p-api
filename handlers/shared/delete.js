'use strict';
const db = require('../dbmanager');

module.exports.delete = async (event, context, callback) => {

    if(!event.pathParameters || !event.pathParameters.id) {
        callback(null, db.response(400, {
            message: 'Error did not find an id in your path.'
        }));
        return;
    }

    db.deleteFromDatabase(process.env.SELECTED_DB, event.pathParameters.id, callback);
};