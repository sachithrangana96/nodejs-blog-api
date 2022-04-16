'use strict';

const { DB,POOL} = require('./database');


module.exports = class User{

    constructor(){}

    static tableName(){
        return "users";
    }

    static getAll(cb){
        return DB.dbQuery(`SELECT * FROM ${this.tableName()}`,[],cb);
    }
    
    static getUserById(id,cb){
        return DB.dbQuery(`SELECT * FROM ${this.tableName()} WHERE id = ?`,[id],cb);
    }

    static getUserStatusWise(st,cb){
        return DB.dbQuery(`SELECT * FROM ${this.tableName} WHERE status = ?`,[st],cb);
    }

    static insert(data,cb){
        return DB.dbQuery(`INSERT INTO ${this.tableName} SET ? `,data,cb);
    }

    static update(data,cb){
        return DB.dbQuery(`UPDATE ${this.tableName} SET ? WHERE id = ? LIMIT 1`,[data,id],cb);
    }

    static delete(id,cb){
        return DB.dbQuery(`DELETE FROM ${this.tableName} WHERE id = ?`,[id],cb);
    }
    
}