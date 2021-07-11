const userController = require('../controllers/user')
const productController = require('../controllers/product')

const resolvers = {
  Query: {
    // User
    getUser: (_, { id } ) => userController.getUser(id),
    //getUsers: (_, _) => userController.getUsers(),
    getHistory: (_, { id } ) => userController.getHistory(id),
    
    // Product
    getProducts: (_) => productController.getProducts(),
    getProduct: (_, { id }) => productController.getProduct({id}),


  },
  Mutation: {
    // User
    register: async (_, {input}) => userController.register(input),
    login: (_, { input }) => userController.login(input),
    updateUser: (_, {input}) => userController.updateUser(input),
    deleteUser: (_, {id}) => userController.deleteUser(id),


    // Product
    createProduct: (_, {input}) => productController.createProduct(input),
    sellProduct: (_, {input}) => productController.sellProduct(input),
    updateProduct: (_, {input}) => productController.updateProduct(input),
    deleteProduct: (_, {id}) => productController.deleteProduct(id),


  }

}

module.exports = resolvers
