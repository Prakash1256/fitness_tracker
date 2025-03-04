// class ApiError extends Error {
//     constructor(
//         statusCode,
//         message = "Something went wrong",
//         errors = [],
//         stack = ""
//     ) {
//         super(message);
//         this.statusCode = statusCode;
//         this.data = null;
//         this.success = false;
//         this.errors = errors;

//         if (stack) {
//             this.stack = stack;
//         } else {
//             Error.captureStackTrace(this, this.constructor);
//         }
//     }
// }

// export default ApiError;


function ApiError(statusCode, message = "Something went wrong", errors = [], stack = "") {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.data = null;
    error.success = false;
    error.errors = errors;

    if (stack) {
        error.stack = stack;
    } else {
        Error.captureStackTrace(error, ApiError);
    }

    return error;
}

export default ApiError;
