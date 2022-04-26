const express = require("express");
const cors = require("cors");
const http = require("http");

const userRouter = require('./src/routes/user');
const categoryRouter = require('./src/routes/category');
const postRouter = require('./src/routes/post');

const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")


const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Blog API",
            version:"1.0.0",
            description:"A Simple Express Blog API"
        },
        servers:[
            {
                url:"http://localhost:4000/v1"
            }
        ],
       
    },
    apis:["./src/routes/*.js"]
}

const specs =  swaggerJsDoc(options)
const app = express();

app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs))


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