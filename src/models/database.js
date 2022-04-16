const mysql = require('mysql');



const POOL = mysql.createPool({
    connectionLimit : 10,
    localhost:'localhost',
    user:'root',
    password:'password',
    database:'blog-project'
})

class DB {

    static dbQuery(query, data, cb, debug=false){
        POOL.getConnection(function(err,conn){
            if(conn) console.log(conn)
            conn.query(query,data, function(error,results,fields){
                conn.release();
                if(debug) console.log(this.sql);
                cb(error,results);
            })
        })
    }
}

module.exports = {
    DB,
    POOL
}