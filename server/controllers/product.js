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
  const user = await User.findOne({_id: userId})

 try {
    products.map( async (p,index) => {

        const product = await Product.findById(p.productId)      

        if(product?.stock < products[index].amount) return false

        product.stock = product.stock - products[index].amount;

        const cart = await ShoppingCart.findOne({_id: user.history})

        cart.products = [
          ...cart.products,
          {
            productId: product._id,
            amount: products[index].amount
          }
        ];
        cart.save()
        product.save()


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
