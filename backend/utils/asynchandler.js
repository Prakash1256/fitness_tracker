const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch(next);
    };
};

export default asyncHandler;

// function asyncHandler(requestHandler) {
//     return function (req, res, next) {
//         Promise.resolve(requestHandler(req, res, next)).catch(next);
//     };
// }

// export default asyncHandler;
