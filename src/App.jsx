import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import DemoPage from './pages/DemoPage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import { LoginPage, RegisterPage, AdminLoginPage } from './pages/AuthPages';

function App() {
  const location = useLocation();
  const hideFooter = location.pathname === '/demo';

  useEffect(() => {
    // Basic dark mode setup
    const saved = localStorage.getItem('theme');
    const isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-brand-50 dark:bg-dark-bg text-brand-900 dark:text-slate-100 font-sans selection:bg-accent-500/30">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
