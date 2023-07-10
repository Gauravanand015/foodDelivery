const express = require("express");
const { authenticate } = require("../middleware/authenticate");
const { UserModel } = require("../model/user.model");
const { OrderModel } = require("../model/order.model");
const order = express.Router();

order.post("/orders",authenticate,async(req,res)=>{
    const user = await UserModel.findOne({_id:req.body.user});
    const userAddress = user.address;
    const data = req.body;
    
    let totalPrice =  0;
    for(let i = 0 ; i<data.items.length ; i++){
        totalPrice += data.items[i].price*data.items[i].quantity;
    }
    
    try {
        let orderData = new OrderModel({
            user:data.user,
            restaurant:data.restaurant,
            items:data.items,
            status:data.status,
            deliveryAddress:userAddress,
            totalPrice:totalPrice
        })

        await orderData.save();
        res.send("Order Placed").status(201)
    } catch (error) {
        console.log(error)
        res.send("Error while ordering food")
    }

})

order.get("/orders/:id",async(req,res)=>{
    const id = req.params.id
    let user = await OrderModel.find({_id:req.params.id}).populate("user").populate("restaurant").exec();
    res.send(user).status(200)
})

order.patch("/orders/:id",async(req,res)=>{
    const id =  req.params.id;
    const order = await OrderModel.findOne({_id:id});
    try {
        const update = await OrderModel.updateOne({_id:id},{status:req.body.status});
        res.send("status updated").status(204)
    } catch (error) {
        console.log(error)
        res.send("Error while updating orders status")
    }
})

module.exports = {
    order
}