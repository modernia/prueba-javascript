const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ShoppingCarSchema = Schema({
  products: {
    type: Array,
    required: true,
  }
})

module.exports = mongoose.model('ShoppingCar', ShoppingCarSchema)
