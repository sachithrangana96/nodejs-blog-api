const express = require("express");
const cors = require("cors");
const http = require("http");

const userRouter = require('./src/routes/user');
const categoryRouter = require('./src/routes/category');
const postRouter = require('./src/routes/post');

const app = express();


app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));




const prefix = "/v1";
app.use(`${prefix}/user`,userRouter);
app.use(`${prefix}/post`,postRouter);
app.use(`${prefix}/category`,categoryRouter);



// test end point
app.get('/',(req,res) => {
    res.send('My Blog ...')
});







const port = process.env.PORT || 4000
app.listen(port,() =>{
    console.log('listening on *, PORT ? ',port);
});