const qs = require('qs');
const User=require('./../models/user');
const APIFeatures = require('./../utils/apiFeatures');

exports.createUser=async (req, res)=>{

    try{
        const newTour=await User.create(req.body);

        res.status(201).json({
            status:'sucess',
            data:{
                newTour
            }
        });

    }catch(err){
        res.status(404).json({
            status:'fail to create user',
            msg: err
        });
    }
};

exports.getAllUser=async (req,res) =>{
    // console.log(JSON.stringify(req.query)); //output:{"sort":"-age"}

    // Use this in your controller
    const parsedQuery = qs.parse(req._parsedUrl.query); // this gives you proper nested object
    console.log(parsedQuery);

    try{
        //EXECUTE QUERY
        const features = new APIFeatures(User.find(), parsedQuery)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const user =await features.query;
      
        //SEND RESPONSE
        res.status(200).json({
            status:'success',
            length: user.length,
            data:{
                user
            }
        });
    }catch(err){
        res.status(404).json({
            status:'fail',
            msg: err
        });
    }
};

exports.getUserById = async (req, res) =>{

        try{
            const user=await User.findById(req.params.id);
            res.status(200).json({
                status:'success',
                data:{
                    user
                }
            });

        }catch(err){
            res.status(404).json({
                status:'fail',
                msg:'Enable to retrive user by ID'
            });
        }
};


exports.updateUser=async (req,res) => {
    try{
        const user=await User.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators: true
        });
    
        res.status(200).json({
            status:'success',
            data:{
                user
            }
        });
       
    }catch(err){
        res.status(404).json({
            status:'fail',
            msg:'Fail to update user details'
        });
    }
};

exports.deleteUser=async (req,res) => {

    try{
        const user=await User.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status:'success',
            data:null
        });
    }catch(err){
        res.status(404).json({
            status:'fail',
            msg:'unable to delete the data'
        });
    }

};
