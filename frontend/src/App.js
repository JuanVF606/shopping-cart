import React, {
  useEffect
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

// Pages visual Imports
import Header from "./components/layout/Header";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";

// Cart imports
import Cart from "./components/cart/Cart";

// Orders imports

// Auth or User Imports
import {
  loadUser
} from "./actions/userActions";
import Login from "./components/User/Login";
import Profile from "./components/User/Profile";
import Register from "./components/User/Register";
import UpdateProfile from "./components/User/UpdateProfile";

// Admin Imports

import ProtectedRoute from "./components/routes/ProtectedRoute";
import Dashboard from "./components/admin/Dashboard";

// Products Import
import store from "./store";
import ProductDetails from "./components/product/ProductDetails";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";



//Payment
import Payment from "./components/cart/Payment";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>

            {/* Init Routes */}
            <Route path="/" element={<Home />} exact />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} exact />
            {/* Cart Routes */}
            <Route path="/cart" element={<Cart />} exact />
            <Route path="/shipping" element={<ProtectedRoute> < Shipping /> </ProtectedRoute>} />
            <Route path="/order/confirm" element={<ProtectedRoute> < ConfirmOrder /> </ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute> < Payment /> </ProtectedRoute>} />
            
            {/* Forms Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* Profile Routes */}
            <Route path="/me" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} exact />
            {/* Admin Routes */}
            <Route path="/dashboard" isAdmin={true} element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;