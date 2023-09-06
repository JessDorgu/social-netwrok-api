const express = require ("express");
const connectDB = require("./config/db");
const routes = require("./routes");


const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


connectDB.once("open", () => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}!`);
    });
  
  });
