const qs=require('qs');

class APIFeatures{
    constructor(query, queryString){
        this.query=query;
        this.queryString=queryString;
    }
    filter(){
        this.queryObj={...this.queryString};
        //Exclude the non required filtering fields
        const excludeFields=["page","sort","limit","fields"];
        excludeFields.forEach(el => delete this.queryObj[el]);
                                    
        //1B: ADVANCED FILTERING
        let queryStr=JSON.stringify(this.queryObj);
         queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    //SORTING
    //http://localhost:3000/api/user?sort=age
    sort(){
        if(this.queryString.sort){
          const sortBy=this.queryString.sort.split(',').join(' ');
          this.query = this.query.sort(sortBy);  
        }
        else{
            this.query=this.query.sort('-createdAt');
        }
        return this;
    }

    //Field Limiting: here we specify the fields in URL which we want to see as response
    //http://localhost:3000/api/user?fields=name,age
    limitFields(){
        if(this.queryString.fields){
            const fields=this.queryString.fields.split(',').join(' ');
            this.query=this.query.select(fields);
        }
        else{
            this.query=this.query.select('-__v');
        }
        return this;
    }

    //Pagination: 
       /*page=here we specify that we only wants 2 pages
          limit=here we specify that each page contains 10 data
          skip=it means that skip the previous page content which we already saw
       */
    //http://localhost:3000/api/user?page=2&limit=10
    paginate(){
        const page=this.queryString.page* 1 || 1;
        const limit=this.queryString.limit*1 || 100;
        const skip = (page - 1)*limit;

        this.query=this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;