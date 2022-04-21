'user strict';

const async = require('async');
const moment = require('moment');

const Post = require('../models/post');
const Category = require('../models/category');
const User = require('../models/user');
const { APIResponse } = require('../utils/globle');
const responseMessage = require('../lib/response-message');


module.exports.getAllPost = async(req,res,next) =>{
    async.waterfall([
        function(callback){
            Post.getAll(function(error,result){
                if(error){
                    return callback(error);
                }

                if(result.length === 0){
                    res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','POSTS NOT FOUND HERE'));
                }
                callback(null,result);
            })
        },
    ],function(error,result){
        return APIResponse(res,error,result);
    })
}


module.exports.getSinglePost = async(req,res,next) =>{
    let id = req.params.id;
    async.waterfall([
        function(callback){
            Post.getPostById(id,function(error,result){
                if(error){
                    return callback(error);
                }

                if(result.length === 0){
                    res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','POST NOT FOUND HERE'));
                }
                callback(null,result);
            })
        },
    ],function(error,result){
        return APIResponse(res,error,result);
    })
}



module.exports.getStatusPost = async(req,res,next) =>{
    let status = req.params.status;
    async.waterfall([
        function(callback){
            Post.getPostsByStatus(status,function(error,result){
                if(error){
                    return callback(error);
                }

                if(result.length === 0){
                    res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'',`NOT FOUND ${status} POSTS`));
                }
                callback(null,result);
            })
        },
    ],function(error,result){
        return APIResponse(res,error,result);
    })
}


module.exports.create = async(req,res,next)=>{
    let catId = req.body.category_id;
    let userId = req.body.user_id;
    
    async.waterfall([
        function(callback){
            Category.getCategoryById(catId,function(error,result){
                if(error){
                    return callback(error);
                }

                if(result.length === 0 ){
                    return res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','CATEGORY NOT FOUND HERE'));
                }

                callback(null,true);
            })
        },
        function(result,callback){
         
            User.getUserById(userId,function(error,result){
                if(error){
                    return callback(error);
                }

                if(result.length === 0){
                    return res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','USER NOT FOUND HERE'))
                }
                callback(null,true);
            })
        },
        function(result,callback){
            let obj = {
                title:req.body.title,
                description:req.body.description,
                category_id:req.body.category_id,
                user_id:req.body.user_id,
                status:"Active",
                created_at:moment().unix()
            }
            Post.insert(obj,function(error,result){
                if(error){
                    return callback(error)
                }

                if(result.affectedRows.length === 0){
                    return res.status(400).json(responseMessage.commonResponse(responseMessage.FAIL,'','POST COULD NOT BE CREATED'));
                }

                obj.id=result.insertId; 
                callback(null,obj);
            })
        },

    ],function(error,result){
        return APIResponse(res,error,result);
    })
}


module.exports.update = async(req,res,next)=>{
    let catId = req.body.category_id;
    let userId = req.body.user_id;
    let postId = req.params.id;
    
    async.waterfall([
        function(callback){
            Category.getCategoryById(catId,function(error,result){
                if(error){
                    return callback(error);
                }

                if(result.length === 0 ){
                    return res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','CATEGORY NOT FOUND HERE'));
                }

                callback(null,true);
            })
        },
        function(result,callback){
         
            User.getUserById(userId,function(error,result){
                if(error){
                    return callback(error);
                }

                if(result.length === 0){
                    return res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','USER NOT FOUND HERE'))
                }
                callback(null,true);
            })
        },
        function(result,callback){
         
            Post.getPostById(postId,function(error,result){
                if(error){
                    return callback(error);
                }

                if(result.length === 0){
                    return res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','POST NOT FOUND HERE'))
                }
                callback(null,true);
            })
        },
        function(result,callback){
            let obj = {
                title:req.body.title,
                description:req.body.description,
                category_id:req.body.category_id,
                user_id:req.body.user_id,
                status:"Active",
                updated_at:moment().unix()
            }
            Post.update(obj,postId,function(error,result){
                if(error){
                    return callback(error)
                }

                if(result.affectedRows.length === 0){
                    return res.status(400).json(responseMessage.commonResponse(responseMessage.FAIL,'','POST COULD NOT BE UPDATED'));
                }

                obj.id=postId; 
                callback(null,obj);
            })
        },

    ],function(error,result){
        return APIResponse(res,error,result);
    })
}

module.exports.deletePost = async(req,res,next) =>{
    let postId = req.body.id;
    async.waterfall([
       function(callback){
        Post.getPostById(postId,function(error,result){
            if(error){
                return callback(error);
            }
            if(result.length === 0){
                return res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','POST NOT FOUND HERE'));
            }
            callback(null,true);
        })
       },
       function(result,callback){
           Post.delete(postId,function(error,result){
               if(error){
                   return callback(error);
               }
               if(result.affectedRows.length === 0){
                   return res.status(400).json(responseMessage.commonResponse(responseMessage.FAIL,'','POST COULD NOT BE DELETED'));
               }
               callback(null,true);
           })
       },
    ],function(error,result){
        let message;
        if(result === true) message = 'POST DELETED SUCCESSFULLY';
        return APIResponse(res,error,result,message);
    })
}

