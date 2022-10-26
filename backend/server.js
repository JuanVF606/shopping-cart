const app = require("./app");
const ConnectMongoDB = require("./config/database");

const dotenv = require("dotenv");

// Hnande Uncaught exceptions
process.on("uncaughtException",err =>{
  console.log(`Error: ${err.message}`);
  console.log('Shuting down the server due to uncaugth exception')
  process.exit(1)
})


// Settings up config file
dotenv.config({ path: "backend/config/config.env" });


// connect DATABASE
ConnectMongoDB();

// Start App
const server = app.listen(process.env.PORT, () => {
  try {
    console.log(
      `Server Started Succefull on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
    );
  } catch (error) {
    console.log(error);
  }
});

// Handle UnHandled Promise rejections
process.on("unhandledRejection",err =>{
  console.log(`Error: ${err.message}`);
  console.log('Shuting down the server due to Unhandled Promise Rejection');
  server.close(()=>{
    process.exit(1)
  })
})
