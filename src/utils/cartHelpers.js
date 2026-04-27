/**
 * Day 26: Unit Testing Helpers
 * Intha file-la namma cart logic-ah encapsulate panrom
 */

// 1. Calculate the total price of items in the cart
export const calculateCartTotal = (cartItems) => {
  if (!cartItems || cartItems.length === 0) return 0;
  
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);
  // Return fixed to 2 decimal places for money
  return parseFloat(total.toFixed(2));
};

// 2. Count specific items (Useful for quantity logic)
export const getCartItemCount = (cartItems) => {
  return cartItems ? cartItems.length : 0;
};

// 3. Format currency (Reusable for whole app)
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// 4. Group items by date (Used in Admin Dashboard)
export const groupOrdersByDate = (orders) => {
  return orders.reduce((acc, order) => {
    const date = new Date(order.date).toLocaleDateString();
    if (!acc[date]) acc[date] = { date, revenue: 0, orders: 0 };
    acc[date].revenue += order.total;
    acc[date].orders += 1;
    return acc;
  }, {});
};