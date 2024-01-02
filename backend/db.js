const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const url = process.env.MONGO_CONNECTION_URL;
const mongoDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("connected");
    try {
      const fetchedData = await mongoose.connection.db.collection("food_items");
      const data = await fetchedData.find({}).toArray();

      const food_category = await mongoose.connection.db.collection(
        "foodCategory"
      );
      const data1 = await food_category.find({}).toArray();
      global.food_items = data;
      global.food_category = data1;
    } catch (err) {
      // Handle errors
      console.error(err);
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = mongoDB;
