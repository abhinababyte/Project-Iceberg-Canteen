import React, { useState, useEffect, useRef } from 'react';
import './AIAssistant.css';

const AIAssistant = ({ menuData, onAddToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hi! I'm your Canteen AI. I can help you decide what to eat! Are you looking for something spicy, sweet, a quick snack, or a full meal?" }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Combine all menus to search from
  const allItems = Object.keys(menuData).reduce((acc, canteenId) => {
    return [...acc, ...menuData[canteenId].map(item => ({...item, canteenId}))];
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const generateResponse = (query) => {
    const q = query.toLowerCase();
    let recommendedItems = [];
    let textResponse = "Hmm, I couldn't find exactly what you're looking for. Try asking for something spicy, sweet, a drink, or a heavy meal!";

    if (q.includes('spicy') || q.includes('hot') || q.includes('fiery')) {
      recommendedItems = allItems.filter(i => i.description.toLowerCase().includes('spic') || i.description.toLowerCase().includes('fiery') || i.name.toLowerCase().includes('masala'));
      textResponse = "If you want some heat, you have to try these!";
    } else if (q.includes('sweet') || q.includes('dessert') || q.includes('sugar') || q.includes('ice cream')) {
      recommendedItems = allItems.filter(i => i.category === 'dessert');
      textResponse = "Got a sweet tooth? Here are my top dessert picks:";
    } else if (q.includes('drink') || q.includes('thirsty') || q.includes('soda') || q.includes('coffee')) {
      recommendedItems = allItems.filter(i => i.category === 'drink');
      textResponse = "Stay hydrated! Here are the best drinks available right now:";
    } else if (q.includes('cheap') || q.includes('snack') || q.includes('quick')) {
      recommendedItems = allItems.filter(i => i.category === 'snack' || i.price < 100).slice(0, 3);
      textResponse = "Here are some quick and affordable snacks:";
    } else if (q.includes('heavy') || q.includes('hungry') || q.includes('meal') || q.includes('lunch') || q.includes('dinner')) {
      recommendedItems = allItems.filter(i => i.category === 'biryani' || i.category === 'pizza' || i.category === 'burger').slice(0, 3);
      textResponse = "Starving? These heavy meals will definitely fill you up!";
    } else if (q.includes('veg') || q.includes('vegetarian')) {
      recommendedItems = allItems.filter(i => i.isVeg).slice(0, 3);
      textResponse = "We have plenty of delicious vegetarian options. Check these out:";
    } else if (q.includes('hi') || q.includes('hello')) {
      return { text: "Hello! Tell me what kind of food you're craving and I'll find the best options for you!" };
    }

    // Deduplicate recommended items by name
    const uniqueItems = [];
    const seenNames = new Set();
    for (const item of recommendedItems) {
      if (!seenNames.has(item.name)) {
        seenNames.add(item.name);
        uniqueItems.push(item);
      }
    }

    return {
      text: textResponse,
      items: uniqueItems.slice(0, 3) // Show max 3 recommendations
    };
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = generateResponse(userMessage.text);
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse.text, items: aiResponse.items }]);
    }, 600);
  };

  return (
    <>
      <button 
        className={`ai-fab ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <img src="/images/chef.png" alt="Chef AI" className="ai-chef-icon" />
      </button>

      <div className={`ai-chat-window glass ${isOpen ? 'open' : ''}`}>
        <div className="ai-header">
          <div className="ai-title">
            <img src="/images/chef.png" alt="Chef AI" className="ai-chef-icon-small" />
            <div>
              <h3>Chef AI</h3>
              <span className="ai-status">Online</span>
            </div>
          </div>
          <button className="btn-close-ai" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <div className="ai-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`ai-message-wrapper ${msg.sender}`}>
              <div className="ai-message-bubble">
                {msg.text}
              </div>
              {msg.items && msg.items.length > 0 && (
                <div className="ai-recommendations">
                  {msg.items.map((item, idx) => (
                    <div key={idx} className="ai-item-card">
                      <div className="ai-item-info">
                        <strong>{item.name}</strong>
                        <span>₹{item.price}</span>
                      </div>
                      <button 
                        className="ai-add-btn"
                        onClick={() => onAddToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="ai-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Ask for recommendations..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="ai-send-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default AIAssistant;
