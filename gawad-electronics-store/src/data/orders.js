// Orders utility for localStorage persistence

export function getOrders() {
  if (typeof window === 'undefined') return [];
  try {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
  } catch {
    return [];
  }
}

export function addOrder(order) {
  if (typeof window === 'undefined') return;
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function clearOrders() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('orders');
} 