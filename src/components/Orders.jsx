import React, { useState } from 'react';
import './Orders.css';

const StarRating = ({ initialRating = 0, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(initialRating);

  const handleClick = (value) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div className="star-rating">
      <span className="rating-text">{rating > 0 ? 'You rated this order:' : 'How was your food? Rate it:'}</span>
      <div className="stars">
        {[1, 2, 3, 4, 5].map(star => (
          <span 
            key={star}
            className={`star ${star <= (hoverRating || rating) ? 'active' : ''}`}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleClick(star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

const Orders = ({ orders, onCancelOrder, onMarkDelivered, onRateOrder }) => {
  // Filter out orders that have already been rated
  const visibleOrders = orders ? orders.filter(o => !o.rating || o.rating === 0) : [];

  if (visibleOrders.length === 0) {
    return (
      <div className="orders-container">
        <h2 className="section-title">Your Orders</h2>
        <div className="empty-orders glass">
          <p>You haven't placed any orders yet, or you have rated all your past orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2 className="section-title">Your Orders</h2>
      <div className="orders-list">
        {visibleOrders.map(order => (
          <div key={order.id} className="order-card glass">
            <div className="order-header">
              <div>
                <span className="order-id">Order #{order.id}</span>
                <span className="order-date">{new Date(order.date).toLocaleString()}</span>
              </div>
              <div className="order-header-actions">
                {order.status === 'Preparing' && (
                  <button className="btn-cancel" onClick={() => onCancelOrder(order.id)}>Cancel</button>
                )}
                {order.status === 'Ready' && (
                  <button className="btn-received" onClick={() => onMarkDelivered(order.id)}>Mark as Received</button>
                )}
                <div className={`order-status ${order.status.toLowerCase().replace(' ', '-')}`}>
                  {order.status}
                </div>
              </div>
            </div>
            
            {/* Status Progress Bar for active orders */}
            {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
              <div className="order-progress-container">
                <div className="progress-track">
                  <div className={`progress-fill step-${order.status === 'Preparing' ? '1' : '2'}`}></div>
                </div>
                <div className="progress-labels">
                  <span className="active">Received</span>
                  <span className={order.status === 'Preparing' || order.status === 'Ready' ? 'active' : ''}>Preparing</span>
                  <span className={order.status === 'Ready' ? 'active' : ''}>Ready</span>
                </div>
              </div>
            )}

            {/* Rating System for Delivered orders */}
            {order.status === 'Delivered' && (
              <div className="order-rating-container">
                <StarRating 
                  initialRating={order.rating} 
                  onRate={(val) => onRateOrder(order.id, val)} 
                />
              </div>
            )}

            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item-row">
                  <span>{item.quantity}x {item.name}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Total Paid</span>
              <span>₹{order.total}</span>
            </div>
          </div>
        )).reverse()}
      </div>
    </div>
  );
};

export default Orders;
