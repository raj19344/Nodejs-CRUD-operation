const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'A tour must have a name'],
    },
    age:{
        type:Number
      },
    task:{
        type: String
    }  
    },
    {
    timestamps:true
});

const User=mongoose.model('User',userSchema);

module.exports=User;