const express=require('express');
const userRouter=require('./routers/userRouter');
const app=express();

app.use(express.json()); //Parse incoming json request

app.use((req,res,next) => {
    console.log('Welcome to middleware');
    next();
});

//ROUTES:
app.use('/api/user',userRouter);

//export this app.js
module.exports=app;

