'use strict'

/**
 * prepare common response JSON
 * @param {string} code - status code
 * @param {object} data - record data 
 * @param {message} - Optional message to be sent
 */


 /**
  * function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
  }
  */

function commonResponse(code,data = '',message=''){
    var msg = {
        'code':code,
        'data':data,
        'message':message
    }
    return msg;
}

/**
 * export module functions to be accessed from outside
 */

module.exports = {
    // Responses
    commonResponse:commonResponse,

    // Status Codes
    SUCCESS: 'SUCCESS',
    FAIL: 'FAIL',
    MISSING_MANDATORY_ATTRIBUTE: 'MISSING_MANDATORY_ATTRIBUTE',
    DUPLICATE_RECORD: 'DUPLICATE_RECORD',
    RECORD_NOT_FOUND: 'RECORD_NOT_FOUND',
    USER_NOT_FOUND:'USER NOT FOUND',
    NO_DEVICE_FOUND: 'NO_DEVICE_FOUND',
    NOT_FOUND: 'NOT_FOUND',

    INVALID_RESET_TOKEN: "INVALID_RESET_TOKEN",

    AUTH_FAILED: 'AUTH_FAILED',
    PERMISSION_DENIED: "PERMISSION_DENIED",
    INVALID_USERNAME_PASSWORD: 'INVALID_USERNAME_PASSWORD',
    PASSWORD_EMPTY: 'PASSWORD_EMPTY',
    SIGNUP_SUCCESS_MSG: "SIGNUP_SUCCESS_MSG",

    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    INVALID_OR_EXPIRED_TOKEN: "INVALID_OR_EXPIRED_TOKEN",
    NEW_LOG_IN: "NEW_LOG_IN",
}