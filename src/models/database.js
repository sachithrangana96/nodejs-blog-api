const mysql = require('mysql');



const POOL = mysql.createPool({
    connectionLimit : 10,
    localhost:process.env.RDS_HOSTNAME,
    user:process.env.RDS_USERNAME,
    password:process.env.RDS_PASSWORD,
    database:process.env.RDS_PORT
})

class DB {

    static dbQuery(query, data, cb, debug=false){
        POOL.getConnection(function(err,conn){
            // if(conn) console.log("connections",conn)
            
            conn.query(query,data, function(error,result,fields){
                conn.release();
                if(debug) console.log(this.sql);
                cb(error,result);
            })
        })
    }

    // static async dbPromiseQuery(query,data,debug = false){
    //     const promisePool = POOL.promise();
    //     if(debug){
    //         const sql = promisePool.format(query,data);
    //         console.log(sql)
    //     }
    //     return await promisePool.query(query,data)
    // }
}

module.exports = {
    DB,
    POOL
}