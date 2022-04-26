'use strict';

const {DB,POOL } = require('./database');

module.exports = class Category{

    constructor(){}

    static tableName(){
        return "category";
    }

    static getAll(cb){
        return DB.dbQuery(`SELECT * FROM ${this.tableName()}`,[],cb);
    }

    static getCategoryById(id,cb){
        return DB.dbQuery(`SELECT * FROM ${this.tableName()} WHERE id = ?`,[id],cb);
    }

    static getCategoryByStatus(st,cb){
        return DB.dbQuery(`SELECT * FROM ${this.tableName()} WHERE status=?`,[st],cb);
    }

    static getAllCount(st,cb){
        return DB.dbQuery(`SELECT COUNT(id) AS TOTAL FROM ${this.tableName()} WHERE status=?`,[st],cb);
    }

    static getByCategory(cat,cb){
        return DB.dbQuery(`SELECT * FROM ${this.tableName()} WHERE name = ?`,[cat],cb);
    }

    static create(data,cb){
        return DB.dbQuery(`INSERT INTO ${this.tableName()} SET ?`,data,cb);
    }

    static update(id,data,cb){
        return DB.dbQuery(`UPDATE ${this.tableName()} SET ? WHERE id = ? LIMIT 1`,[data,id],cb);
    }

    static delete(id,cb){
        return DB.dbQuery(`DELETE FROM ${this.tableName()} WHERE id=?`,[id],cb);
    }

}
