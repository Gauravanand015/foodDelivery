const express = require("express");
const { RestaurantModel } = require("../model/restaurant.model");
const { authenticate } = require("../middleware/authenticate");
const restaurant = express.Router();

restaurant.get("/restaurant",async(req,res)=>{
    // console.log(req.body)
    const data = await RestaurantModel.find();
    res.send(data).status(200);
})

restaurant.post("/restaurant/menu",async(req,res)=>{
    const data = req.body;
    try {
        let resData = new RestaurantModel(data);
        await resData.save();
        res.send("Menu Added")
    } catch (error) {
        console.log(error);
        res.send("Error while posting menu")
    }
})

restaurant.get("/restaurant/:resId",async(req,res)=>{
    const id = req.params.resId;
    const data = await RestaurantModel.find({_id:id});
    res.send(data).status(200);
})

restaurant.get("/restaurant/:resId/menu",async(req,res)=>{
    const id = req.params.resId;
    const data = await RestaurantModel.findOne({_id:id});
    res.json(data.menu).status(200);
})

restaurant.post("/restaurant/:resId/menu",async(req,res)=>{
    const id = req.params.resId;
    const {name,description,image,price} = req.body;
    const data = await RestaurantModel.find({_id:id});
    try {
        let menuData = await RestaurantModel.updateOne({_id:id},{$push:{menu:{
            name,
            description,
            image,
            price
        }}})
        res.send("new item added in the menu").status(201)
    } catch (error) {
        console.log(error);
        res.send("Error while adding new menu Item")
    }
})

restaurant.delete("/restaurant/:resId/menu/:menuId",async(req,res)=>{
    const id = req.params.resId;
    const mId = req.params.menuId;
    const data = await RestaurantModel.findOne({_id:id});
    // data.menu;
    // res.json(arr.length)
    for(let i = 0 ; i<data.menu.length ; i++){
        if(data.menu[i]._id == mId){
            console.log(data.menu[i]._id)
             const deleteData = await RestaurantModel.deleteOne({_id:data.menu[i].mId}); 
             res.send(data)
        }
    }
    res.send()
})
module.exports = {
    restaurant
}