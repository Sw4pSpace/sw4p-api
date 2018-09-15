'use strict';

class DbManager {

    get projectDatabase() {
        return process.env.PROJECT_TABLE;
    }

    get teamDatabase() {
        return process.env.TEAM_TABLE;
    }

    get applicationJson() {
        return {'Content-Type': 'application/json'};
    }

    get currentTime() {
        return new Date().getTime();
    }

    get dynamodb() {
        return require('./dynamodb');
    }

    response(statusCode, body) {
        return {
            statusCode: statusCode,
            body: JSON.stringify(body),
            headers: this.applicationJson
        };
    }

    deleteOrGetParams(table, id) {
        return {TableName: table, Key: {id: id}};
    }

    listParams(table) {
        return {TableName: table};
    }

    saveParams(table, data) {
        return {TableName: table, Item: data};
    }

    fetchFromDatabase(table, id, callback) {
        this.dynamodb.get(this.deleteOrGetParams(table, id), (err, data) => {
            if (err) {
                callback(null, this.response(err.statusCode || 501, {
                    message: "Error fetching from database",
                    error: err
                }));
                return;
            }
            callback(null, this.response(200, data.Item));
        });
    }

    scanDatabase(table, callback) {
        this.dynamodb.scan(this.listParams(table), (err, data) => {
            if (err) {
                callback(null, this.response(err.statusCode || 501, {
                    message: "Error scanning database",
                    error: err
                }));
                return;
            }
            callback(null, this.response(200, data.Items));
        });
    }

    deleteFromDatabase(table, id, callback) {
        this.dynamodb.delete(this.deleteOrGetParams(table, id), (error) => {
            if (error) {
                callback(null, this.response(error.statusCode || 501, {
                    message: 'Error deleting from database.',
                    error: error
                }));
                return;
            }
            callback(null, this.response(200, {}));
        });
    }

    saveToDatabase(table, data, callback) {
        this.dynamodb.put(this.saveParams(table, data), (error) => {
            if (error) {
                callback(null, this.response(error.statusCode || 501, {
                    message: 'Error saving to database',
                    error: error,
                    data: data
                }));
                return;
            }
            callback(null, this.response(201, data));
        });
    }

}

module.exports = new DbManager();

/*
{

    project_database: '',
    team_database: process.env.TEAM_TABLE,

    application_json: {'Content-Type': 'application/json'},
    current_time: new Date().getTime(),

    dynamo: () => require('./dynamodb'),

    response: (statusCode, body) => {
        return {
            statusCode: statusCode,
            body: JSON.stringify(body),
            headers: this.application_json
        };
    },

    deleteOrGetParams: (table, id) => {
        return {TableName: table, Key: {id: id}};
    },

    listParams: (table) => {
        return {TableName: table};
    },

    saveParams: (table, data) => {
        return {TableName: table, Item: data};
    },

    fetchFromDatabase: (table, id, callback) => {
        this.dynamo.get(this.deleteOrGetParams(table, id), (err, data) => {
            if (err) {
                callback(null, this.response(err.statusCode || 501, {
                    message: "Error fetching from database",
                    error: err
                }));
                return;
            }
            callback(null, this.response(200, data.Item));
        });
    },

    scanDatabase: (table, callback) => {
        this.dynamo.scan(this.listParams(table), (err, data) => {
            if (err) {
                callback(null, this.response(err.statusCode || 501, {
                    message: "Error scanning database",
                    error: err
                }));
                return;
            }
            callback(null, this.response(200, data.Items));
        });
    },

    deleteFromDatabase: (table, id, callback) => {
        this.dynamo.delete(this.deleteOrGetParams(table, id), (error) => {
            if (error) {
                callback(null, this.response(error.statusCode || 501, {
                    message: 'Error deleting from database.',
                    error: error
                }));
                return;
            }
            callback(null, this.response(200, {}));
        });
    },

    saveToDatabase: (table, data, callback) => {
        this.dynamo.put(this.saveParams(table, data), (error) => {
            if (error) {
                callback(null, this.response(error.statusCode || 501, {
                    message: 'Error saving to database',
                    error: error,
                    data: data
                }));
                return;
            }
            callback(null, this.response(201, data));
        });
    }

};*/
