const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://Ketan:Ketan1610@cluster0.rwvk47z.mongodb.net/?retryWrites=true&w=majority"
  );
};

module.exports = connect;
