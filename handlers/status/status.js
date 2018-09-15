'use strict';

module.exports.status = async (event, context, callback) => {
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({status: 'Alive <3'}),
        headers: {'Content-Type': 'application/json'}
    });
};