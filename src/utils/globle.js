const responseMessage = require('../lib/response-message');


module.exports.APIResponse = function (res, error, result, messages=""){
    if(error){
        if(error.errno == 1452) //invalid paramiter sent
            res.status(400).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'',process.env.NODE_ENV !== 'production' ? error.sqlMessage:''));
        else if(error.errno == 1062) //invalid paramiter sent
            res.status(400).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND,'', error.sqlMessage));
        else
            process.env.NODE_ENV !== 'production' ? console.log(error) : '';
            return res.status(500).json(responseMessage.commonResponse(responseMessage.FAIL,'',''));
    }

    if(result == null) { //No result
        return res.status(400).json(responseMessage.commonResponse(responseMessage.RECORD_NOT_FOUND));
    }else{
        // console.log("Api",result)
        return res.status(200).json(responseMessage.commonResponse(responseMessage.SUCCESS,  result === true ? '' : result, messages));

    }
}