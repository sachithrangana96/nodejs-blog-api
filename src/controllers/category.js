'use strict';

const async = require('async');
const moment = require('moment');

const Category = require('../models/category');
const { APIResponse } = require('../utils/globle');
const responseMessage = require('../lib/response-message');



module.exports.getAllCategory = async(req,res,next) =>{
    async.waterfall([
        function(callback){
            Category.getAll(function(error,result){
                if(error){
                    return callback(error);
                }

                if(result.length === 0){
                    res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','CATEGORY NOT FOUND HERE'));
                }
                callback(null,result);
            })
        },
    ],function(error,result){
        return APIResponse(res,error,result);
    })
}


module.exports.getCategoryById = async(req,res,next) =>{
    let cat = req.params.id;
    async.waterfall([
        function(callback){
            Category.getCategoryById(cat,function(error,result){
                if(error){
                    // return callback(error);
                    console.log(error)
                }

                if(result.length === 0){
                    res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','CATEGORY NOT FOUND HERE'));
                }
              
                callback(null,result);
            })
        },
    ],function(error,result){
        return APIResponse(res,error,result);
    })
}

module.exports.getStatusCategory = async(req,res,next) =>{
    let status = req.params.status; 
    async.waterfall([
        function(callback){
            Category.getCategoryByStatus(function(error,result){
                if(error){
                    return callback(error);
                }

                if(result.length === 0){
                    res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'',`NOT FOUND ${status} CATEGORY`));
                }
                callback(null,result);
            })
        },
    ],function(error,result){
        return APIResponse(res,error,result);
    })
}

module.exports.create = async(req,res,next) =>{
    let cat = req.body.name;
    let obj = {
        name:req.body.name,
        status:"Active",
        created_at:moment().unix()
    }
    
    async.waterfall([
        function(callback){
            Category.getByCategory(cat,function(error,result){
                if(error){
                    return callback(error);
                }
                 
                if(result.length > 0){
                    return res.status(400).json(responseMessage.commonResponse(responseMessage.DUPLICATE_RECORD,'','DUPLICATED CATEGORY ENTER !'))
                }
                callback(null,true);
            })
        },
        function(result,callback){
            Category.create(obj,function(error,result){
                if(error){
                    return callback(error)
                }

                if(result.affectedRows.length === 0){
                    return res.status(400).json(responseMessage.commonResponse(responseMessage.FAIL,'','CATEGORY COULD NOT BE CREATED'));
                }
                obj.id = result.insertId; 
                callback(null,obj);
            })
        },
    ],function(error,result){
        return APIResponse(res,error,result);
    })
}


module.exports.updateCategory = async (req,res,next) => {
     let catId = req.params.id;
     let upObj = {
        name:req.body.name,
        status:"Active",
        updated_at:moment().unix()
    }
    async.waterfall([
             function(callback){
                    Category.getCategoryById(catId,function(error,result){
                        if(error){
                            return callback(error);
                        }
                        if(result.length === 0){
                            return res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','CATEGORY NOT FOUND'));
                        }
                        callback(null,true);
                    })
            },
                function(result,callback){
                    Category.update(catId,upObj,function(error,result){
                        if(error){
                            return callback(error);
                        }
                        if(result.affectedRows.length === 0){
                            return res.status(400).json(responseMessage.commonResponse(responseMessage.FAIL,'','CATEGORY COULD NOT BE UPDATED'));
                        }

                        upObj.id = catId;
                        callback(null,upObj)
                    })
                },
            ],function(error,result){
                return APIResponse(res,error,result)
    })
}


module.exports.deleteCategory =async (req,res,next) =>{
    let catId = req.params.id;
    async.waterfall([
        function(callback){
            Category.getCategoryById(catId,function(error,result){
                if(error){
                    return callback(error);
                }

                if(result.length === 0){
                    res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','CATEGORY NOT FOUND HERE'));
                }
                callback(null,result);
            })
        },
        function(result,callback){
            Category.delete(catId,function(error,result){
                if(error){
                    return callback(error);
                }

                if(result.affectedRows.length === 0){
                    return res.status(424).json(responseMessage.commonResponse(responseMessage.FAIL,'','CATEGORY COULD NOT BE DELETED'));
                }
                callback(null,true);
            })
        },
    ],function(error,result){
        let message;
        if(result === true) message = 'CATEGORY DELETED SUCCESFULLY';
        return APIResponse(res,error,result,message);
    })
}
