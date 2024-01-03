require("dotenv").config()
const express = require("express");
const app = express();
const port = process.env.PORT||4000 ;
const cors = require("cors");
const mongoDB = require("./db");
mongoDB();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("hello word");
});

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.listen(port, () => {
  console.log(`listening ${port} ${process.env}`);
});
