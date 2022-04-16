const express = require("express");
const cors = require("cors");
const http = require("http");



const app = express();


app.use(cors());
app.use(express.json());


const prefix = "/v1";
app.use(`${prefix}/user`);
app.use(`${prefix}/post`);
app.use(`${prefix}/category`);



// test end point
app.get('/',(req,res) => {
    res.send('My Blog ...')
});







const port = process.env.PORT || 4000
app.listen(port,() =>{
    console.log('listening on *, PORT ? ',port);
});