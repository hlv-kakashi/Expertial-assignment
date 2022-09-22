const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./routes/Allroutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", route);
app.get("/",(req,res) => {
    console.log("server connected");
    res.send("hello ists working")
})

let url = "mongodb+srv://hlv-kakashi:Anupam123@cluster0.tjkwwu3.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT|| 8080;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));