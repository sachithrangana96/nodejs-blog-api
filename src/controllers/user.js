'use strict';

const async = require('async');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const {APIResponse} = require('../utils/globle');
const responseMessage = require('../lib/response-message');
const moment = require('moment');

module.exports.getAllUsers = async (req,res,next) => {
    async.waterfall([
        function(callback){
            User.getAllCount("Active",function(error,result){
                if(error){
                    callback(error);
                }

                if(result.length === 0){
                    return res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','NO USERS FOUND HERE'));
                }

                callback(null,result);
            })
        },
        function (total,callback){
            User.getAll(function(error,result){
                if(error){
                    callback(error)
                }

                if(result.length === 0){
                    return res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','NO USERS FOUND HERE'));
                }

                callback(null,{
                    "User_Count":total,
                    "Users":result
                })
            })
        },

    ],function(error,result){
        console.log(result)
        return APIResponse(res,error,result)
    })
}

module.exports.getUserById = async (req,res,next) => {
    let userId = req.params.id;
    async.waterfall([
        function (callback){
            User.getUserById(userId,function(error,result){
                if(error){
                    callback(error)
                }

                if(result.length === 0){
                    return res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','NO USER FOUND HERE'));
                }

                callback(null,result)
            })
        },

    ],function(error,result){
        // console.log(result)
        return APIResponse(res,error,result)
    })
}

module.exports.getStatusUsers = async (req,res,next) => {
    let status = req.params.status;
    async.waterfall([
        function (callback){
            User.getUserStatusWise(function(error,result){
                if(error){
                    callback(error)
                }

                if(result.length === 0){
                    return res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'',`NOT FOUND ${status}`));
                }

                callback(null,result)
            })
        },

    ],function(error,result){
        // console.log(result)
        return APIResponse(res,error,result)
    })
}

module.exports.create = async(req,res,next) =>{
  
    let email = req.body.email;
    async.waterfall([
        function(callback){
            User.findByEmail(req.body.email,function(error,result){
                if(error){
                  return  callback(error)
                }
                if(result.length > 0){
                    return res.status(400).json(responseMessage.commonResponse(responseMessage.DUPLICATE_RECORD,'','This User Already Register !'));
                }
                callback(null,result);
            })
        },
        function(rst,callback){

            

            const salt = bcrypt.genSaltSync(10)
            let dataValues = {
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password,salt),
                dob:req.body.dob,
                profile:req.file.filename,
                status:"Active",
                created_at:moment().unix()
            }
            // console.log(dataValues)
            User.insert(dataValues,function(error,result){
                if(error){
                    return callback(error)
                }

                if (result.affectedRows.length === 0 ) {
                    return res.status(424).json(responseMessages.commonResponse(responseMessages.FAIL, '', 'User Could not be created ')); 
                }

                dataValues.id = result.insertId;
                callback(null,dataValues);

            })
        },
    ],function(error,result){
        return APIResponse(res,error,result)
    })
}

module.exports.updateUser = async(req,res,next)=>{
   let userId = req.params.id;
    // console.log(req.params.id)

    async.waterfall([
        function(callback){
            User.getUserById(userId,function(error,result){
                if(error){
                    return callback(error);
                }

                if(result.length === 0){
                    return res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','NO  USERS FOUND'));
                }

                callback(null,true);
            })
        },
        function(result,callback){

          let  upObj = {
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                email:req.body.email,
                dob:req.body.dob,
                status:"Active",
                updated_at:moment().unix()
            }

            User.update(upObj,userId,function(error,result){
                if(error){
                    return callback(error);
                }

                if(result.affectedRows.length === 0){
                    return res.status(424).json(responseMessage.commonResponse(responseMessage.FAIL,'','USER COULD NOT BE UPDATED'));
                }

                upObj.id = userId;
                callback(null,upObj);
            })
        },
    ],function(error,result){
        return APIResponse(res,error,result);
    })
}


module.exports.deleteUser = async(req,res,next) =>{
    let userId = req.params.id;
    async.waterfall([

        function(callback){
            User.getUserById(userId,function(error,result){
                if(error){
                    return callback(error)
                }

                if(result.length === 0){
                    return res.status(404).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'','NO USER FOUND HERE'));
                }

                callback(null,true);
            })
        },

        function(user,callback){
            User.delete(userId,function(error,result){
                if(error){
                    return callback(error);
                }

                if(result.affectedRows.length === 0){
                    return res.status(424).json(responseMessage.commonResponse(responseMessage.FAIL,'','USER COULD NOT BE DELETED'));
                }

                callback(null,true);


            })
        },
    ], function(error,result){
        let message;
        if(result===true) message = 'USER DELETED SUCCESSFULLY';
        return APIResponse(res,error,result,message);
    })
}