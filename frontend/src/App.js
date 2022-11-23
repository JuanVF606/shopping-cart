import React, {
  useEffect
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { useSelector } from "react-redux";

// Pages visual Imports
import Header from "./components/layout/Header";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";

// Cart imports
import Cart from "./components/cart/Cart";

// Orders imports
import ListOrders from "./components/order/ListOrder";
import OrderDetails from "./components/order/OrderDetails";
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
import ProductsList from "./components/admin/ProductList"
import NewProduct from "./components/admin/NewProduct"

// Products Import
import store from "./store";
import ProductDetails from "./components/product/ProductDetails";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";



//Payment
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

const App = () => {
   const { user, isAuthenticated, loading } = useSelector(state => state.auth)
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
            <Route path="/success" element={<ProtectedRoute> < OrderSuccess /> </ProtectedRoute>} />
            
            {/* Forms Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* Profile Routes */}
            <Route path="/me" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} exact />
            <Route path="/orders/me" element={<ProtectedRoute> <ListOrders /> </ProtectedRoute>} exact/>
            <Route path="/order/:id" element={<ProtectedRoute> <OrderDetails /> </ProtectedRoute>} exact/>    
            <Route path="/dashboard" isAdmin={true} element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
<Route path="/admin/products" isAdmin={true} element={<ProtectedRoute> <ProductsList /> </ProtectedRoute>} />
<Route path="/admin/product" isAdmin={true} element={<ProtectedRoute> <NewProduct /> </ProtectedRoute>} />
          </Routes>
        </div>
          
           
            {/* <Routes><Route path="/admin/product/:id" isAdmin={true} element={<ProtectedRoute> <UpdateProduct /> </ProtectedRoute>} />  </Routes>  
            <Routes><Route path="/admin/orders" isAdmin={true} element={<ProtectedRoute> <OrdersList /> </ProtectedRoute>} />  </Routes>  
            <Routes><Route path="/admin/order/:id" isAdmin={true} element={<ProtectedRoute> <ProcessOrder /> </ProtectedRoute>} />  </Routes>  
            <Routes><Route path="/admin/users" isAdmin={true} element={<ProtectedRoute> <UsersList /> </ProtectedRoute>} />  </Routes>  
            <Routes><Route path="/admin/user/:id" isAdmin={true} element={<ProtectedRoute> <UpdateUser /> </ProtectedRoute>} />  </Routes>  
            <Routes><Route path="/admin/reviews" isAdmin={true} element={<ProtectedRoute> <ProductReviews /> </ProtectedRoute>} />  </Routes>   */}
        {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />)}
        
      </div>
    </Router>
  );
};

export default App;