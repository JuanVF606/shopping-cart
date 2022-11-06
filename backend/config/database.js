const mongoose = require("mongoose");

const ConnectMongoDB = () => {
    try {
        mongoose.connect(process.env.DB_LOCAL_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(con =>{
            console.log(`MongoDB Database conneccted  with HOST: ${con.connection.host}`);
        })
    } catch (error) {
        console.log("Can not connect to Database please contact with support to help ");
    }

};

module.exports = ConnectMongoDB