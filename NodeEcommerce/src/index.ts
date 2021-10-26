import express from "express";
import connectDB from "../config/dbconnection";
import user from "./routes/user";
import product from "./routes/product";
import cart from "./routes/cart";
const bodyParser = require('body-parser');
const app = express();
require("dotenv").config();

//db connection
connectDB();

//start the server
const server = app.listen(process.env.PORT || 3000, () =>
    console.log(`server started on the port ${process.env.PORT || 3000}`)
);

//server started and api running
app.get('/', (req, res) => {
    res.send("api is running")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/users', user);
app.use('/api/products', product);
app.use('/api/cart', cart);