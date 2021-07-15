const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const ShoppingCart = require('../models/shopping-cart')
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
  const newUser = input

  const {email, name, password, lastname, address} = newUser
  
  //Revisar si el email esta en uso
  const foundEmail = await User.findOne({email})
  if(foundEmail) throw new Error('El email ya está en uso')


  //Encriptar contraseña
  const salt = bcryptjs.genSaltSync(10)
  newUser.password = await bcryptjs.hash(password, salt)

  try{
    const cart = new ShoppingCart({
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

async function deleteUser(id){

  try {
    

    User.findByIdAndDelete(id, (err, user) => {
      if (err){
        console.log(err)
      }

      ShoppingCart.findOneAndDelete(user.history, (error, cart ) => {
        if (err){
          console.log(err)
        }

        return true
      })

    })
  } catch (error) {
    return false
  }
  
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
    return true


  } catch (error) {
    return false
  }
}


async function getHistory(id) {
  let products = []

  try {

    const user = await User.findOne({_id: id})

    if(!user) throw new Error('El usuario no existe')


    let cart = await ShoppingCart.findOne({_id: user.history})


    return cart.products.map(async (p) => {

      const product = await Product.findById(p.productId)

      return {
        amount: p.amount,
        id: p.productId,
        name: product.name,
        stock: product.stock,
        image: product.image,
        price: product.price
      }
    })




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
  getHistory,
  deleteUser
}
