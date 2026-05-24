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
  const [view, setView] = useState('active'); // 'active' | 'history'

  // Filter orders based on active vs history
  const activeOrders = orders ? orders.filter(o => o.status !== 'Cancelled' && (!o.rating || o.rating === 0)) : [];
  const historyOrders = orders ? orders.filter(o => o.status === 'Cancelled' || o.rating > 0) : [];

  const displayOrders = view === 'active' ? activeOrders : historyOrders;

  return (
    <div className="orders-container">
      <div className="orders-header-top">
        <h2 className="section-title">Your Orders</h2>
        <div className="orders-tabs">
          <button 
            className={`tab-btn ${view === 'active' ? 'active' : ''}`}
            onClick={() => setView('active')}
          >
            Active
          </button>
          <button 
            className={`tab-btn ${view === 'history' ? 'active' : ''}`}
            onClick={() => setView('history')}
          >
            History
          </button>
        </div>
      </div>

      {displayOrders.length === 0 ? (
        <div className="empty-orders glass">
          <p>{view === 'active' ? "You have no active orders." : "Your order history is empty."}</p>
        </div>
      ) : (
        <div className="orders-list">
          {displayOrders.map(order => (
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

              {/* Rating System for Delivered active orders */}
              {order.status === 'Delivered' && (!order.rating || order.rating === 0) && (
                <div className="order-rating-container">
                  <StarRating 
                    initialRating={order.rating} 
                    onRate={(val) => onRateOrder(order.id, val)} 
                  />
                </div>
              )}

              {/* Static Rating display for History orders */}
              {view === 'history' && order.rating > 0 && (
                <div className="history-rating">
                  <span className="history-rating-text">Your Rating:</span>
                  <span className="history-stars">
                    {'★'.repeat(order.rating)}{'☆'.repeat(5 - order.rating)}
                  </span>
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
      )}
    </div>
  );
};

export default Orders;
