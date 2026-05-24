import React from 'react';
import './Orders.css';

const Orders = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="orders-container">
        <h2 className="section-title">Your Orders</h2>
        <div className="empty-orders glass">
          <p>You haven't placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2 className="section-title">Your Orders</h2>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card glass">
            <div className="order-header">
              <div>
                <span className="order-id">Order #{order.id}</span>
                <span className="order-date">{new Date(order.date).toLocaleString()}</span>
              </div>
              <div className={`order-status ${order.status.toLowerCase().replace(' ', '-')}`}>
                {order.status}
              </div>
            </div>
            
            {/* Status Progress Bar for active orders */}
            {order.status !== 'Completed' && (
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
