export function addProductCart(product) {
  if(window.localStorage.getItem('products')) {
    
    const productsLS = JSON.parse(window.localStorage.getItem('products'))
    productsLS.push(product)

    window.localStorage.setItem('products', JSON.stringify(productsLS));
    

  } else {
    window.localStorage.setItem('products', JSON.stringify([product]));
  }
}

export function addProductCartObject(product) {
  if(window.localStorage.getItem('productsObject')) {
    
    const productsObjectLS = JSON.parse(window.localStorage.getItem('productsObject'))
    productsObjectLS.push(product)

    window.localStorage.setItem('productsObject', JSON.stringify(productsObjectLS));
    

  } else {
    window.localStorage.setItem('productsObject', JSON.stringify([product]));
  }
}

export function getProducts() {

  if(window.localStorage.getItem('products')) {
    return JSON.parse(window.localStorage.getItem('products'))
  }else {
    return 'No hay productos agregados'
  }

}

export function addNewProductCartObject(product, productId = null) {
  window.localStorage.setItem('productsObject', JSON.stringify(product));

  if(productId !== null) {
    window.localStorage.setItem('products', JSON.stringify(productId));

  }

}

export function removeItemsCart() {
  window.localStorage.removeItem('products');
  window.localStorage.removeItem('productsObject');
}


export function getProductsObject() {

  if(window.localStorage.getItem('productsObject')) {
    return JSON.parse(window.localStorage.getItem('productsObject'))
  }else {
    return []
  }

}