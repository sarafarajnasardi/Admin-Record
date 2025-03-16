import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import Overview from './components/Dashboard/MainContentArea/Overview';
import OrdersList from './components/Dashboard/MainContentArea/Orders/OrdersList';
import OrderDetails from './components/Dashboard/MainContentArea/Orders/OrderDetails';
import DeliveriesList from './components/Dashboard/MainContentArea/Deliveries/DeliveriesList';
import DeliveryDetails from './components/Dashboard/MainContentArea/Deliveries/DeliveryDetails';
import PaymentsList from './components/Dashboard/MainContentArea/Payments/PaymentsList';
import PaymentDetails from './components/Dashboard/MainContentArea/Payments/PaymentDetails';
import ArtisansManagement from './components/Dashboard/MainContentArea/ArtisansManagement';
import AddProduct from './components/Dashboard/MainContentArea/products/add_product';
import ProductList from './components/Dashboard/MainContentArea/products/your_products';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={<AuthPage />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<Overview />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders/:orderId" element={<OrderDetails />} />
          <Route path="deliveries" element={<DeliveriesList />} />
          <Route path="deliveries/:deliveryId" element={<DeliveryDetails />} />
          <Route path="payments" element={<PaymentsList />} />
          <Route path="payments/:paymentId" element={<PaymentDetails />} />
          <Route path="artisans" element={<ArtisansManagement />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="products" element={<ProductList />} />

        </Route>

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
