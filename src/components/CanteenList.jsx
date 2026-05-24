import React from 'react';
import './CanteenList.css';

const canteens = [
  { id: 1, name: 'Main Cafeteria', time: '10-15 mins', rating: '4.5' },
  { id: 2, name: 'Nescafe Kiosk', time: '5 mins', rating: '4.8' },
  { id: 3, name: 'Spicy Bite', time: '20 mins', rating: '4.2' }
];

const CanteenList = ({ activeCanteen, onCanteenSelect }) => {
  return (
    <div className="canteen-list-container">
      <h2 className="section-title">Explore Campus Canteens</h2>
      <div className="canteen-scroll">
        {canteens.map(canteen => (
          <div 
            key={canteen.id} 
            className={`canteen-card glass ${activeCanteen === canteen.id ? 'active' : ''}`}
            onClick={() => onCanteenSelect(canteen.id)}
            style={{ cursor: 'pointer' }}
          >
            <h3>{canteen.name}</h3>
            <div className="canteen-meta">
              <span className="rating">★ {canteen.rating}</span>
              <span className="dot">•</span>
              <span className="time">{canteen.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanteenList;
