const asyncErrorWrapper = require("express-async-handler");
const {searchHelper, populateHelper, questionSortHelper, paginationHelper} = require("./queryMiddlewareHelpers.js");



const questionQueryMiddleware = function (model, options){

    return asyncErrorWrapper (async function(req, res, next){ // bu bir middleware func . u return eder.
        // initial(baslat) query - 
        let query = model.find(); //model : user or question or answer

        // Search
        query = searchHelper("title", query, req);

        if(options.population){
            query = populateHelper(query, options.population);
        }

        query = questionSortHelper(req, query);
        
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
    questionQueryMiddleware
}

