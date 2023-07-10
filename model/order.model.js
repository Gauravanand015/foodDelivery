const mongoose = require("mongoose");
const { UserModel } = require("./user.model");
const { RestaurantModel } = require("./restaurant.model");

const orderSchema = mongoose.Schema({
    user : { type: mongoose.Schema.ObjectId, ref: "User" },
    restaurant : { type: mongoose.Schema.ObjectId, ref: "Restaurant" },
  items: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  totalPrice: Number,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  status: String // e.g, "placed", "preparing", "on the way", "delivered"
})

const OrderModel = mongoose.model("order",orderSchema);

module.exports = {
    OrderModel
}