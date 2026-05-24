# 🍔 Iceberg Canteen App

Iceberg Canteen is a highly aesthetic, feature-rich college food delivery and ordering web application prototype. Designed to feel like a modern, premium campus equivalent to Swiggy or Zomato, it allows students to browse multiple college canteens, place orders, and chat with an AI assistant.

**🔴 Live Demo:** [https://project-iceberg-canteen.vercel.app](https://project-iceberg-canteen.vercel.app) (Replace with your actual Vercel URL if changed)

---

## ✨ Key Features

### 1. Multi-Canteen Architecture
- Browse distinct menus from different campus canteens (e.g., **Main Cafeteria**, **Nescafe Kiosk**, **Spicy Bite**).
- Dynamic item filtering based on food categories (Biryani, Burgers, Drinks, Desserts, etc.).

### 2. 🔍 Global Food Search
- A powerful search bar that scans **all canteens simultaneously**.
- Search results instantly generate glass-morphism badges indicating exactly which canteen the food originates from.

### 3. 🔐 Domain-Restricted Authentication
- Simulated login system strictly locked to official college email IDs (e.g., `@rcciit.org.in`).
- Auto-generates user profile badges based on the student's email alias.

### 4. 🛒 Comprehensive Order Management & History
- **Live Tracking Dashboard:** Track active orders with a neon progress bar from `Preparing` to `Ready`.
- **Order Cancellation:** Instantly cancel orders while they are still in the `Preparing` phase.
- **5-Star Rating System:** Mark orders as `Delivered` and leave an interactive 1-to-5 star rating.
- **Smart Tabs:** The dashboard automatically sorts orders into `Active` (currently cooking) and `History` (past rated/cancelled orders).
- **Local Storage Integration:** Your cart, login session, and order history strictly persist across browser reloads.

### 5. 🤖 Chef AI Assistant
- An interactive, floating animated Chef AI that helps students decide what to eat.
- **Smart Keyword Engine:** Recommends specific items based on natural language broad categories (e.g., "spicy", "sweet", "cheap snack").
- **Fuzzy Item Searching:** The AI acts as a search assistant, capable of extracting exact dish names from a conversational sentence (e.g., "I'm craving dum biryani") and serving up the exact food card.
- **Interactive UI:** The AI generates interactive food cards inside the chat window, allowing you to instantly add its recommendations directly to your cart without closing the chat.

### 6. 📱 Premium Mobile-Responsive UI
- Completely responsive design optimized for mobile devices.
- A beautiful, sliding hamburger navigation drawer.
- Implements advanced **Glassmorphism** styling with blurred backgrounds, semi-transparent frosted-glass cards, neon highlights, and deep drop-shadows for high readability.

---

## 🛠️ Technologies & Tools Used

- **React.js:** Component-based UI architecture, utilizing advanced hooks (`useState`, `useEffect`) for complex global state management.
- **Vite:** Next-generation frontend tooling for ultra-fast hot module replacement and building.
- **Vanilla CSS3:** Advanced modern styling without external UI frameworks. Features include:
  - Custom CSS variables for centralized theming.
  - `backdrop-filter` for glassmorphism blurs.
  - CSS Keyframe animations for the AI Assistant and Progress Bars.
  - Responsive media queries.
- **Browser LocalStorage API:** Used to mock a persistent backend database for carts, users, and order histories.
- **Custom Generative AI Media:** Assets like the background wallpaper, food images, and animated chef avatar were custom-generated specifically for this prototype.

---

## 🚀 How to Run Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```

3. **Open the App:**
   Navigate to the `localhost` URL provided in the terminal (usually `http://localhost:5173/`).
