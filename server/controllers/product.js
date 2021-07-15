const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Product = require('../models/product')
const User = require('../models/user')
const ShoppingCart = require('../models/shopping-cart')


require('dotenv').config({path: '.env'})



async function createProduct(input) {
  const role = userRoleValid(input.userId)
  
  if (!role) return {message: 'El usuario no puede crear productos'}

  const newProduct = input

  const {price, stock, name, image} = newProduct

  try{
    const product = new Product(newProduct)
    product.save()
    return product

  }catch (error) {
    console.log(error)
  }


  return input
}

async function getProduct({id}){
	let product = null;
	if(id) product = await Product.findById({_id: id});

	
	
	if(!product) throw new Error('El producto no existe')
	
	return product;
	
}

async function getProducts(){
  let products = null;
  products = await Product.find();
  
  
  if(!products) throw new Error('No hay productos para mostrar')
  
  return products;
  
}


async function updateProduct(input) {
  const role = userRoleValid(input.userId)
  
  if (!role) return 'El usuario no puede actualizar información de productos'

  try {

    const product = await Product.findByIdAndUpdate(input.productId, {
      name: input.name,
      stock: input.stock,
      price: input.price,
    })

    return true

  } catch (error) {
    return false
  }
}

async function sellProduct(input) {
  
  const {userId, products} = input

  try {
    await products.forEach( async (p,index) => {
  const user = await User.findOne({_id: userId})


        await sellProductByOne(p, products[index].amount, user.history)
        

        return true

    })
    
    return true
  } catch (error) {
    return false
  }


}

async function deleteProduct(id){
  let product = null;

  try {
    if(id) product = await Product.findById(id);

    if(!product) throw new Error('El producto no existe')
  
    await product.remove();

    return true
  } catch (error) {
    return false
  }
  
}


async function sellProductByOne(p, amount, idCart) {
  let product = await Product.findById(p.productId)

  if(product?.stock < amount) return false

  product.stock = product.stock - amount;
  

  let cart = await ShoppingCart.findById(idCart)

  cart.products.push({
      productId: product._id,
      amount
    })

  delete cart.__v

  await cart.save()
  await product.save()

}


async function userRoleValid(id) {
  const user = User.findById({_id: id})
  if(user?._id === 'ADMIN_ROLE') return true
  else return false
}


module.exports = {
  createProduct,
  getProduct,
  getProducts,
  sellProduct,
  updateProduct,
  deleteProduct
}
