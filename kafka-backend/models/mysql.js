const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    database: 'AmazonReplica'
});

function executeQuery(query, callback) {
    // con.connect();
    
        con.query(query, function (err, rows) {

            if (err) {
                callback(err, null);
            }

            callback(null, rows);
        });
    // con.end();
}

module.exports.executeQuery = executeQuery;