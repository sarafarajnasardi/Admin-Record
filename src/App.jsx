import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={<AuthPage />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
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
        </Route>

        {/* Default Route (Redirect to Login) */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;