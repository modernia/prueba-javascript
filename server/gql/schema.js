const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    id: ID
    name: String
    lastname: String
    address: String
    password: String
    email: String
  }

  type Product {
    id: ID
    name: String
    price: String
    stock: String
    image: String
    amount: Int
  }



  input ProductSell {
    productId: ID
    amount: Int
  }

  input ProductSellInput {
    userId: ID
    products: [ProductSell]
  }

  type Token {
    token: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UserInput {
    name: String!
    lastname: String!
    email: String!
    avatar: String
    password: String!
    address: String
  }

  input ProductInput {
    name:String!
    price: String
    stock: String
    image: String
  }

  input UserUpdateInput {
    name: String
    lastname: String
    email: String
    currentPassword: String
    newPassword: String
    address: String
    userId: String!
  }



  type Query {
    # User
    getUser(id: ID): User 

    # Product
    getProducts: [Product]
    getProduct(id: ID): Product 
    getHistory(id: ID): [Product] 


  }

  type Mutation {
    # User
    register(input: UserInput): User
    login(input: LoginInput): Token
    updateUser(input: UserUpdateInput): Boolean

    # Product
    createProduct(input: ProductInput): Product
    sellProduct(input: ProductSellInput): Boolean



  }
`

module.exports = typeDefs
