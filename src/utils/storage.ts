import type { Product, CartItem, User, Order } from '../types';

// Default Products Data
const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro M3',
    description: 'Latest MacBook Pro with M3 chip, 14-inch display',
    price: 149900,
    seller: 'Apple Store',
    location: 'Mumbai',
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    rating: 4.9,
    stock: 50
  },
  {
    id: '2',
    name: 'Sony WH-1000XM5',
    description: 'Premium noise-cancelling headphones',
    price: 29990,
    seller: 'Sony Center',
    location: 'Delhi',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    rating: 4.8,
    stock: 100
  },
  {
    id: '3',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip',
    price: 134900,
    seller: 'Apple Store',
    location: 'Bangalore',
    category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
    rating: 4.9,
    stock: 75
  },
  {
    id: '4',
    name: 'Samsung QLED 4K TV',
    description: '65-inch QLED 4K Smart TV',
    price: 129990,
    seller: 'Samsung Shop',
    location: 'Hyderabad',
    category: 'TVs',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800',
    rating: 4.7,
    stock: 30
  },
  {
    id: '5',
    name: 'iPad Air',
    description: '10.9-inch iPad Air with M1 chip',
    price: 59900,
    seller: 'Apple Store',
    location: 'Chennai',
    category: 'Tablets',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
    rating: 4.8,
    stock: 60
  },
  {
    id: '6',
    name: 'PlayStation 5',
    description: 'Next-gen gaming console',
    price: 49990,
    seller: 'Sony Center',
    location: 'Mumbai',
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800',
    rating: 4.9,
    stock: 25
  },
  {
    id: '7',
    name: 'Canon EOS R5',
    description: 'Full-frame mirrorless camera with 8K video',
    price: 339990,
    seller: 'Canon Store',
    location: 'Mumbai',
    category: 'Cameras',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    rating: 4.9,
    stock: 15
  },
  {
    id: '8',
    name: 'Dell XPS 15',
    description: 'Premium laptop with 4K OLED display',
    price: 219900,
    seller: 'Dell Store',
    location: 'Delhi',
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
    rating: 4.7,
    stock: 35
  },
  {
    id: '9',
    name: 'Apple Watch Ultra 2',
    description: 'Advanced smartwatch with titanium case',
    price: 89900,
    seller: 'Apple Store',
    location: 'Mumbai',
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800',
    rating: 4.8,
    stock: 40
  },
  {
    id: '10',
    name: 'Bose QuietComfort 45',
    description: 'Premium wireless noise-cancelling headphones',
    price: 29990,
    seller: 'Bose Store',
    location: 'Bangalore',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800',
    rating: 4.7,
    stock: 55
  },
  {
    id: '11',
    name: 'Samsung Galaxy S23 Ultra',
    description: '200MP camera, S Pen functionality',
    price: 124999,
    seller: 'Samsung Store',
    location: 'Delhi',
    category: 'Smartphones',
    image: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s23-5g-1.jpg?w=800',
    rating: 4.8,
    stock: 60
  },
  {
    id: '12',
    name: 'Microsoft Xbox Series X',
    description: '4K gaming console with ray tracing',
    price: 49990,
    seller: 'Microsoft Store',
    location: 'Bangalore',
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800',
    rating: 4.8,
    stock: 30
  },
  {
    id: '13',
    name: 'GoPro Hero 11 Black',
    description: 'Advanced action camera with HyperSmooth 5.0',
    price: 45000,
    seller: 'GoPro Store',
    location: 'Mumbai',
    category: 'Cameras',
    image: 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=800',
    rating: 4.7,
    stock: 40
  },
  {
    id: '14',
    name: 'LG C3 OLED TV',
    description: '65-inch 4K OLED TV with Dolby Vision',
    price: 239990,
    seller: 'LG Store',
    location: 'Delhi',
    category: 'TVs',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800',
    rating: 4.9,
    stock: 20
  },
  {
    id: '15',
    name: 'MacBook Air M2',
    description: 'Ultra-thin laptop with M2 chip',
    price: 114900,
    seller: 'Apple Store',
    location: 'Bangalore',
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
    rating: 4.8,
    stock: 45
  }
];

// Products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const products = localStorage.getItem('products');
    if (!products) {
      localStorage.setItem('products', JSON.stringify(defaultProducts));
      return defaultProducts;
    }
    return JSON.parse(products);
  } catch (error) {
    console.error('Error getting products:', error);
    return defaultProducts;
  }
};

// Cart
export const getStoredCart = (): CartItem[] => {
  try {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};

export const setStoredCart = (cart: CartItem[]): void => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error setting cart:', error);
  }
};

// User
export const getStoredUser = (): User | null => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const setStoredUser = (user: User): void => {
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error setting user:', error);
  }
};

export const clearStoredUser = (): void => {
  try {
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error clearing user:', error);
  }
};

// Orders
export const getOrders = (userId: string): Order[] => {
  try {
    const orders = localStorage.getItem(`orders_${userId}`);
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

export const saveOrder = async (order: Order): Promise<void> => {
  try {
    const orders = getOrders(order.userId);
    orders.unshift(order); // Add new order at the beginning
    localStorage.setItem(`orders_${order.userId}`, JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

export const updateOrderStatus = (
  userId: string, 
  orderId: string, 
  status: Order['status']
): void => {
  try {
    const orders = getOrders(userId);
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    );
    localStorage.setItem(`orders_${userId}`, JSON.stringify(updatedOrders));
  } catch (error) {
    console.error('Error updating order status:', error);
  }
};

// Helper Functions
export const getCategories = async (): Promise<string[]> => {
  try {
    const products = await getProducts();
    const categories = new Set(products.map(product => product.category));
    return Array.from(categories).sort();
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

export const getLocations = async (): Promise<string[]> => {
  try {
    const products = await getProducts();
    const locations = new Set(products.map(product => product.location));
    return Array.from(locations).sort();
  } catch (error) {
    console.error('Error getting locations:', error);
    return [];
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const products = await getProducts();
    const searchTerm = query.toLowerCase();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.seller.toLowerCase().includes(searchTerm) ||
      product.location.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

export const updateProductStock = async (
  productId: string, 
  newStock: number
): Promise<void> => {
  try {
    const products = await getProducts();
    const updatedProducts = products.map(product =>
      product.id === productId ? { ...product, stock: newStock } : product
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  } catch (error) {
    console.error('Error updating product stock:', error);
  }
};