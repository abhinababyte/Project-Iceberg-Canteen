import React from 'react';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, onClose, cart, onRemoveFromCart, onCheckout }) => {
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + taxes;

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`cart-sidebar glass ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Order</h2>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <p>Add some delicious food from the menu!</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <span className={`veg-dot ${item.isVeg ? 'veg' : 'non-veg'}`}></span>
                  <span className="item-name">{item.name}</span>
                </div>
                <div className="item-controls">
                  <span className="item-qty">x{item.quantity}</span>
                  <span className="item-price">₹{item.price * item.quantity}</span>
                  <button className="btn-remove" onClick={() => onRemoveFromCart(item.id)}>✕</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="bill-details">
              <div className="bill-row">
                <span>Item Total</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="bill-row">
                <span>Taxes & Charges (5%)</span>
                <span>₹{taxes}</span>
              </div>
              <div className="bill-row grand-total">
                <span>To Pay</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
            
            <button className="btn-checkout btn-primary" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
