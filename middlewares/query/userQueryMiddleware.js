const asyncErrorWrapper = require("express-async-handler");
const Question = require("../../models/Question");

const {searchHelper, paginationHelper} = require("./queryMiddlewareHelpers.js");



const userQueryMiddleware = function (model){

    return asyncErrorWrapper (async function(req, res, next){ // bu bir middleware func . u return eder.
        
        // initial(baslat) query - 
        let query = model.find(); //model : user or question or answer

        // Search
        query = searchHelper("name", query, req);

        // pagination
        const paginationInfo = await paginationHelper(model, query, req);

        query = paginationInfo.query;
        const pagination = paginationInfo.pagination;
        const queryResult = await query;
        
        res.queryResult = {
            success: true,
            pagination: pagination,
            data: queryResult,
            count: queryResult.length
        }


        next();
        
    })
};



module.exports = {
    userQueryMiddleware
}

