const products = [
 { id: 1, name: 'a', price: 4, CategoryID: '1' },
 { id: 2, name: 'b', price: 5, CategoryID: '2' },
 { id: 3, name: 'c', price: 8, CategoryID: '3' },
 { id: 4, name: 'd', price: 9, CategoryID: '1' },
 { id: 5, name: 'e', price: 2, CategoryID: '2' },
 { id: 6, name: 'f', price: 9, CategoryID: '3' },
 { id: 7, name: 'g', price: 5, CategoryID: '1' },
 { id: 8, name: 'h', price: 3, CategoryID: '2' },
 { id: 9, name: 'i', price: 2, CategoryID: '3' },
 { id: 10, name: 'k', price: 4, CategoryID: '1' }
];

const categories = [
 { id: 1, name: 'shirt' },
 { id: 2, name: 'pant' },
 { id: 3, name: 'kurta' }
];

const selectedCategories = ['shirt', 'kurta'];


const filteredProducts = products.filter(product => {
    
  
  const category = categories.find(cat => cat.id.toString() === product.CategoryID);
  
  return category && selectedCategories.includes(category.name);
});

console.log(filteredProducts);