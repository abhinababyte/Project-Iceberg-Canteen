import React, { useState } from 'react';
import './Menu.css';

const categories = [
  { id: 'all', label: 'All Items' },
  { id: 'biryani', label: 'Biryani' },
  { id: 'burger', label: 'Burger' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'dosa', label: 'Dosa' },
  { id: 'curry', label: 'Curry' },
  { id: 'snack', label: 'Snacks' },
  { id: 'drink', label: 'Drinks' },
  { id: 'dessert', label: 'Desserts & Sweets' }
];

const Menu = ({ onAddToCart, searchQuery = '', menuItems = [] }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const specialItems = filteredItems.filter(item => item.isSpecial);
  const regularItems = filteredItems.filter(item => !item.isSpecial);

  const renderCard = (item, isSpecialCard = false) => (
    <div key={`${item.id}-${item.canteenId || 'default'}`} className={`menu-card glass ${isSpecialCard ? 'special-card' : ''}`}>
      {item.canteenName && searchQuery && (
        <div className="canteen-badge">From {item.canteenName}</div>
      )}
      {isSpecialCard && <div className="special-badge">⭐ Top Rated</div>}
      <div className="menu-image">
        <img src={item.image} alt={item.name} />
        <span className={`veg-badge ${item.isVeg ? 'veg' : 'non-veg'}`}>
          {item.isVeg ? 'V' : 'NV'}
        </span>
      </div>
      <div className="menu-content">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="menu-footer">
          <span className="price">₹{item.price}</span>
          <button className="btn-add" onClick={() => onAddToCart(item)}>
            ADD +
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="menu-container">
      {searchQuery ? (
        <div className="section-header">
          <h2 className="section-title">Search Results for "{searchQuery}"</h2>
          <p className="section-subtitle">Found {filteredItems.length} items</p>
          <div className="menu-grid" style={{ marginTop: '20px' }}>
            {filteredItems.map(item => renderCard(item, false))}
          </div>
        </div>
      ) : (
        <>
          {activeCategory === 'all' && (
            <>
              <div className="section-header">
                <h2 className="section-title">✨ Today's Special</h2>
                <p className="section-subtitle">Chef's highest rated dishes for the day!</p>
              </div>
              <div className="special-scroll">
                {specialItems.map(item => renderCard(item, true))}
              </div>
            </>
          )}

          <div className="section-header" style={{ marginTop: activeCategory === 'all' ? '50px' : '0' }}>
            <h2 className="section-title">{activeCategory === 'all' ? 'All Menu Items' : `${categories.find(c => c.id === activeCategory)?.label} Menu`}</h2>
            <div className="category-filters">
              {categories.map(cat => (
                <button 
                  key={cat.id} 
                  className={`btn-category ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div className="menu-grid">
            {activeCategory === 'all' 
              ? regularItems.map(item => renderCard(item, false))
              : filteredItems.map(item => renderCard(item, false))
            }
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
