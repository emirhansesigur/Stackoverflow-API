// sanırım farklı olayları fonksyon halinde yazdıracagiz.
const Question = require("../../models/Question");

const searchHelper = function(searchKey, query,req){
    
    if(req.query.search){
        const searchObject = {};
        
        const regex = new RegExp(req.query.search, "i"); // i: case-insensitive matching
        
        searchObject[searchKey] = regex; //searchObject: { title: 'ibrahim' } bu oluyor.
        //regex oldugu icin mongodb varsa mongo yazsan da bulur

        query = query.where(searchObject);
        // Question.find.where({title: req.query.search});
    }
    return query;
}

const populateHelper = function(query, population){
    
    return query.populate(population); //caution! await query.populate(...) diye olmak zorunda değil

}

const questionSortHelper = function(req, query){

    //Sort most-liked, most-answered, undefined
    const sortInfo = req.query.sortBy;
    if(sortInfo === "Most-liked"){
        query = query.sort("-likeCount -createdAt");
    }
    else if(sortInfo === "Most-answered"){
        query = query.sort("-answerCount -createdAt");
    }
    else{
        query = query.sort("-createdAt");
    }

    return query;

}

// paginationHelper(model, query, req);
const paginationHelper = async function(question, query, req){

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const total = await Question.countDocuments();

    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const pagination = {};

    if(startIndex>0){
        pagination.previous = { // caution to assignment!
            page: page-1,
            limit: limit
        }
    }

    if(endIndex<total){
        pagination.next = {
            page: page+1,
            limit: limit
        }
    }

    return {
        query: query.skip(startIndex).limit(limit),
        pagination: pagination
    }

}

module.exports = {
    searchHelper,
    populateHelper,
    questionSortHelper,
    paginationHelper
}

