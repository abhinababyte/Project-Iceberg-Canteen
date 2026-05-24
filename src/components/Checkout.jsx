import React from 'react';
import './Checkout.css';

const addOns = [
  { id: 201, name: 'Coca Cola', description: 'Chilled 330ml Can', price: 40, image: '/images/coke.png', isVeg: true },
  { id: 202, name: 'Vanilla Ice Cream', description: 'Single scoop of classic vanilla', price: 60, image: '/images/icecream.png', isVeg: true },
  { id: 203, name: 'Masala Lemonade', description: 'Refreshing sweet & salty shikanji', price: 30, image: '/images/coffee.png', isVeg: true }
];

const Checkout = ({ cart, onAddToCart, onRemoveFromCart, onBack, onPlaceOrder }) => {
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxes = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + taxes;

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty! Please add some food first.');
      return;
    }
    onPlaceOrder(grandTotal);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        
        {/* Left Side: Order & Add-ons */}
        <div className="checkout-main">
          <div className="checkout-header-row">
            <button className="btn-back" onClick={onBack}>
              ← Back to Menu
            </button>
            <h2>Review Your Order</h2>
          </div>
          
          <div className="checkout-cart-list glass">
            {cart.length === 0 ? (
              <p className="empty-msg">No items in your order.</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="checkout-cart-item">
                  <div className="item-info">
                    <span className={`veg-dot ${item.isVeg ? 'veg' : 'non-veg'}`}></span>
                    <span className="name">{item.name}</span>
                  </div>
                  <div className="item-actions">
                    <span className="qty">x{item.quantity}</span>
                    <span className="price">₹{item.price * item.quantity}</span>
                    <button className="btn-remove" onClick={() => onRemoveFromCart(item.id)}>✕</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <h3 className="addons-title">Complete your meal with Add-ons</h3>
          <div className="addons-grid">
            {addOns.map(addon => (
              <div key={addon.id} className="addon-card glass">
                <img src={addon.image} alt={addon.name} />
                <div className="addon-info">
                  <h4>{addon.name}</h4>
                  <p>{addon.description}</p>
                  <div className="addon-bottom">
                    <span className="price">₹{addon.price}</span>
                    <button className="btn-addon-add" onClick={() => onAddToCart(addon)}>
                      + ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Bill Summary */}
        <div className="checkout-sidebar">
          <div className="bill-summary glass">
            <h3>Bill Details</h3>
            <div className="bill-row">
              <span>Item Total</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="bill-row">
              <span>Taxes & Charges (5%)</span>
              <span>₹{taxes}</span>
            </div>
            <div className="divider"></div>
            <div className="bill-row grand">
              <span>To Pay</span>
              <span>₹{grandTotal}</span>
            </div>

            <button className="btn-place-order btn-primary" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
