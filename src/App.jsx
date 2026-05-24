import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CanteenList from './components/CanteenList';
import Menu from './components/Menu';
import CartSidebar from './components/CartSidebar';

import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Footer from './components/Footer';
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import AIAssistant from './components/AIAssistant';
import { menuData } from './data/menus';

function App() {
  // Initialize state from localStorage if available
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('iceberg_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('iceberg_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('iceberg_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCanteen, setActiveCanteen] = useState(1);

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('iceberg_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('iceberg_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('iceberg_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('iceberg_user');
    }
  }, [user]);

  const handleLogin = (email) => {
    const name = email.split('@')[0].split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ');
    setUser({ email, name });
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    if (activeTab === 'orders' || activeTab === 'checkout') {
      setActiveTab('home');
    }
  };

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
  };

  const handlePlaceOrder = (total) => {
    if (!user) {
      setIsLoginOpen(true);
      return;
    }
    
    const newOrder = {
      id: Math.floor(1000 + Math.random() * 9000),
      items: [...cart],
      total: total,
      date: new Date().toISOString(),
      status: 'Preparing'
    };

    setOrders(prev => [...prev, newOrder]);
    setCart([]); // Empty cart
    setActiveTab('orders'); // Jump to orders page
    
    // Simulate order progression
    setTimeout(() => {
      setOrders(prevOrders => 
        prevOrders.map(o => (o.id === newOrder.id && o.status === 'Preparing') ? { ...o, status: 'Ready' } : o)
      );
    }, 15000); // 15 seconds to Ready for demo purposes
  };

  const handleCancelOrder = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o)
    );
  };

  const handleMarkDelivered = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(o => o.id === orderId ? { ...o, status: 'Delivered' } : o)
    );
  };

  const handleRateOrder = (orderId, rating) => {
    setOrders(prevOrders => 
      prevOrders.map(o => o.id === orderId ? { ...o, rating: rating } : o)
    );
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const canteenNames = {
    1: 'Main Cafeteria',
    2: 'Nescafe Kiosk',
    3: 'Spicy Bite'
  };

  const getGlobalMenuItems = () => {
    if (!searchQuery) return menuData[activeCanteen] || [];
    
    // Combine all menus for global search
    let allItems = [];
    Object.keys(menuData).forEach(canteenId => {
      const itemsWithCanteen = menuData[canteenId].map(item => ({
        ...item,
        canteenId: parseInt(canteenId),
        canteenName: canteenNames[canteenId]
      }));
      allItems = [...allItems, ...itemsWithCanteen];
    });
    
    return allItems;
  };

  const renderContent = () => {
    if (activeTab === 'home') {
      return (
        <>
          {!searchQuery && (
            <CanteenList 
              activeCanteen={activeCanteen} 
              onCanteenSelect={setActiveCanteen} 
            />
          )}
          <Menu 
            onAddToCart={handleAddToCart} 
            searchQuery={searchQuery} 
            menuItems={getGlobalMenuItems()}
          />
        </>
      );
    }
    if (activeTab === 'about') {
      return <About />;
    }
    if (activeTab === 'contact') {
      return <Contact />;
    }
    if (activeTab === 'orders') {
      return (
        <Orders 
          orders={orders} 
          onCancelOrder={handleCancelOrder}
          onMarkDelivered={handleMarkDelivered}
          onRateOrder={handleRateOrder}
        />
      );
    }
    if (activeTab === 'checkout') {
      return (
        <Checkout 
          cart={cart} 
          onAddToCart={handleAddToCart} 
          onRemoveFromCart={handleRemoveFromCart} 
          onBack={() => setActiveTab('home')}
          onPlaceOrder={handlePlaceOrder}
        />
      );
    }
    return null;
  };

  return (
    <div className="app-container">
      <Header 
        cartCount={totalItems} 
        onCartClick={() => setIsCartOpen(true)} 
        onLoginClick={() => setIsLoginOpen(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        user={user}
        onLogout={handleLogout}
      />
      
      <main>
        {renderContent()}
      </main>

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setActiveTab('checkout');
        }}
      />

      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={handleLogin}
      />
      
      <AIAssistant menuData={menuData} onAddToCart={handleAddToCart} />
      
      <Footer />
    </div>
  );
}

export default App;
