import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import GiftcardsPage from './pages/GiftcardsPage';
import CryptoPage from './pages/CryptoPage';
import TransactionsPage from './pages/TransactionsPage';
import ReferralPage from './pages/ReferralPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import ServicesPage from './pages/ServicesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/giftcards" element={<GiftcardsPage />} />
        <Route path="/crypto" element={<CryptoPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/referral" element={<ReferralPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* Services */}
        <Route path="/airtime" element={<ServicesPage />} />
        <Route path="/data" element={<ServicesPage />} />
        <Route path="/cable" element={<ServicesPage />} />
        <Route path="/electricity" element={<ServicesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
