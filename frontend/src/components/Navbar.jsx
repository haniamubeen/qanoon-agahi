import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, Moon, Sun, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about-us' },
    { label: 'Demo', to: '/demo' },
    { label: 'Team', to: '/team' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-brand-50/80 dark:bg-dark-bg/80 backdrop-blur-lg border-brand-200/50 dark:border-dark-border shadow-sm' : 'bg-transparent border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-accent-600 p-1.5 rounded-lg">
              <Scale size={20} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-brand-900 dark:text-white">AI Legal</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((item) => (
              <Link 
                key={item.label} 
                to={item.to}
                className={`text-sm font-medium transition-colors ${location.pathname === item.to ? 'text-accent-600 dark:text-accent-400' : 'text-brand-600 hover:text-accent-600 dark:text-slate-300 dark:hover:text-accent-400'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="text-brand-500 hover:text-brand-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="hidden sm:flex items-center gap-3">
              <Link to="/register" className="text-sm font-semibold text-brand-700 hover:text-accent-600 dark:text-slate-300 dark:hover:text-white transition-colors">
                Sign Up
              </Link>
              <Link to="/login" className="text-sm font-semibold bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-sm">
                Try for Free
              </Link>
            </div>
            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-brand-700 dark:text-white">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-50/95 dark:bg-dark-bg/95 backdrop-blur-lg border-t border-brand-100 dark:border-dark-border px-4 py-4 space-y-2 animate-fade-in">
          {navLinks.map((item) => (
            <Link 
              key={item.label} 
              to={item.to}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname === item.to ? 'bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400' : 'text-brand-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-dark-surface'}`}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2 border-t border-brand-100 dark:border-dark-border mt-2">
            <Link to="/register" className="flex-1 text-center text-sm font-semibold text-brand-700 dark:text-slate-300 border border-brand-200 dark:border-dark-border px-4 py-2.5 rounded-xl">
              Sign Up
            </Link>
            <Link to="/login" className="flex-1 text-center text-sm font-semibold bg-accent-600 text-white px-4 py-2.5 rounded-xl">
              Try for Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
