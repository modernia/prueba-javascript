const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const ShoppingCar = require('../models/shopping-cart')
const Product = require('../models/product')



require('dotenv').config({path: '.env'})

function createToken(user, SECRET_KEY, expiresIn) {
  const {id, name, email, lastname, address, role} = user
  const payload = {
    id,
    name,
    email,
    lastname,
    address,
    role
  }

  return jwt.sign(payload, SECRET_KEY, {expiresIn})

}


async function register(input) {
  console.log("input", input)
  const newUser = input

  const {email, name, password, lastname, address} = newUser
  
  //Revisar si el email esta en uso
  const foundEmail = await User.findOne({email})
  if(foundEmail) throw new Error('El email ya está en uso')


  //Encriptar contraseña
  const salt = bcryptjs.genSaltSync(10)
  newUser.password = await bcryptjs.hash(password, salt)

  try{
    const cart = new ShoppingCar({
      products: []
    })
    cart.save()
    newUser.history = cart._id
    const user = new User(newUser)
    user.save()
    return user
  }catch (error) {
    console.log(error)
  }


  return input
}

async function login(input) {
  const {email, password} = input

  const userFound = await User.findOne({email: email.toLowerCase()})
  if(!userFound) throw new Error('Contraseña y/o correo incorrectos')

  const passwordSucess = await bcryptjs.compare(password, userFound.password)
  if(!passwordSucess) throw new Error('Contraseña y/o correo incorrectos')

  const token = createToken(userFound, process.env.SECRET_KEY, '48h')

  return {
    ok: true,
    token
  }

}

async function getUser(id){
	let user = null;
	if(id) user = await User.findById(id);
	
	
	if(!user) throw new Error('El usuario no existe')

	return user;
	
}

async function getUsers(){
  let users = [];
  if(id) users = await User.find();
    
  if(users.length === 0) throw new Error('No hay usuarios')
  
  return users;
  
}



async function updateUser(input) {

  try {

    const result = await User.findByIdAndUpdate({_id: input.userId}, input)

    console.log(result)

    return true


  } catch (error) {
    return false
  }
}


async function getHistory(id) {
  try {

    const user = await User.findOne({_id: id})

    if(!user) throw new Error('El usuario no existe')


    let cart = await ShoppingCar.findOne({_id: user.history})

    let products = []

    products = cart.products.map(async (p) => {

      let product = await Product.findOne({_id: p.productId})

      console.log(product)

      return {
        amount: p.amount,
        product
      }
    })




    return products


  } catch (error) {
    return {
      message: 'No hay compras'
    }
  }
}


async function search(search) {
  const users = await User.find({
    name: { $regex: search, $options: 'i'}
  })

  return users
}


module.exports = {
  register,
  login,
  getUser,
  getUsers,
  updateUser,
  getHistory
}
