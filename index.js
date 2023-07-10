const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { restaurant } = require("./routes/restaurant.route");
const { order } = require("./routes/order.route");
const app = express();
require("dotenv").config()

app.use(express.json())
app.get("/",(req,res)=>{
    res.send("FOOD DELIVERY APPLICATION")
})

app.use("/user",userRouter)
app.use("/restaurant",restaurant)
app.use("/order",order)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to Database")
        console.log("Connected to server")
    } catch (error) {
        console.log(error)
        console.log("Error while making connection whit database and server")
    }
})