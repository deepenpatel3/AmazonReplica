const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    database: 'AmazonReplica'
});

function executeQuery(query, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        }

        console.log('connected as id ' + connection.threadId);

        connection.query(query, function (err, rows) {
            connection.release();
            if (err) {
                callback(err, null);
            }

            callback(null, rows);
        });
    });
}

module.exports.executeQuery = executeQuery;