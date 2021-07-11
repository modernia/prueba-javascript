const mongoose = require('mongoose')

const Schema = mongoose.Schema

const validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  history: {
    type: Schema.Types.ObjectId,
    ref: 'ShoppingCar'
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE',
    enum: validRoles
  }
})

module.exports = mongoose.model('User', UserSchema)
