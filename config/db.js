const mongoose = require("mongoose");

// mongodb+srv://kothavineeth23:kothavineeth23@database.byssanh.mongodb.net/learnFlow?retryWrites=true&w=majority
//"mongodb+srv://adityaagr694:adityaagr694@database.iy6osys.mongodb.net/learnFlow?retryWrites=true&w=majority"
//above is sirs database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://kothavineeth23:kothavineeth23@database.byssanh.mongodb.net/learnFlow?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;

