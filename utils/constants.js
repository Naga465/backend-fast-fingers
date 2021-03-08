const responseBody  = {
    data : null,
    error: null,
}

const INTERNAL_SERVER_ERROR =  { ...responseBody ,error : 'Internal Server Error'}

exports.responseBody = responseBody;
exports.INTERNAL_SERVER_ERROR = INTERNAL_SERVER_ERROR;
