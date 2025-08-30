
const dotenv=require('dotenv'); 
dotenv.config({path: './config.env'});

const mongoose=require('mongoose');
const app=require('./app');

const DB=process.env.DATABASE;

mongoose.connect(DB)
.then(con => {
    //console.log(con.connection);
    console.log('DB connection successful !');
});

const port=process.env.PORT;
app.listen(port, () => {
    console.log('App running on port 3000' );
});
