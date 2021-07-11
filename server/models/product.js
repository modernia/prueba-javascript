const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  stock: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  }
})

module.exports = mongoose.model('Product', ProductSchema)
