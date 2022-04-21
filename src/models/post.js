'use strict';

const {DB ,POOL } = require('./database');

module.exports = class Post{
    constructor(){}

    static tableName(){
        return 'posts';
    }

    static getAll(cb){
        return DB.dbQuery(`SELECT * FROM ${this.tableName()}`,cb);
    }

    static getPostById(id,cb){
        return DB.dbQuery(`SELECT * FROM ${this.tableName()} WHERE id = ?`,[id],cb);
    }

    static getPostsByStatus(st,cb){
        return DB.dbQuery(`SELECT * FROM ${this.tableName()} WHERE status = ?`,[st],cb);
    }

    static getPostByCategoryId(ctId ,cb){
        return DB.dbQuery(`SELECT * FROM ${this.tableName()} WHERE category_id = ?`,[ctId],cb);
    }

    static getPostByStatus(st,cb){
        return DB.dbQuery(`SELECT * FROM ${this.tableName()} WHERE status = ?`,[st],cb);
    }

    static getPostByUserId(userId,cb){
        return DB.dbQuery(`SELECT * FROM ${this.tableName()} WHERE user_id = ?`,[userId],cb);
    }

    static insert(data,cb){
        return DB.dbQuery(`INSERT INTO ${this.tableName()} SET ?`,data,cb);
    }

    static update(data,id,cb){
        return DB.dbQuery(`UPDATE ${this.tableName()} SET ? WHERE id = ? LIMIT 1`,[data,id],cb);
    }

    static delete(id,cb){
        return DB.dbQuery(`DELETE FROM ${this.tableName()} WHERE id = ?`,[id],cb);
    }
}