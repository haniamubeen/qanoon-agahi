import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Lock, User, Mail, ShieldAlert } from 'lucide-react';

const AuthCard = ({ title, subtitle, children }) => (
  <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center items-center px-4 bg-brand-50 dark:bg-dark-bg">
    <div className="w-full max-w-md bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-xl border border-brand-100 dark:border-dark-border">
      <div className="flex justify-center mb-6">
        <div className="bg-accent-600 p-3 rounded-xl shadow-md">
          <Scale size={24} className="text-white" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-brand-900 dark:text-white mb-2">{title}</h2>
      <p className="text-center text-sm text-brand-500 dark:text-slate-400 mb-8">{subtitle}</p>
      {children}
    </div>
  </div>
);

const InputField = ({ icon: Icon, label, type = "text", placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-brand-700 dark:text-slate-300 mb-1">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-400">
        <Icon size={18} />
      </div>
      <input 
        type={type} 
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-2 border border-brand-200 dark:border-dark-border rounded-xl focus:ring-accent-500 focus:border-accent-500 bg-brand-50 dark:bg-dark-bg text-brand-900 dark:text-white transition-colors"
      />
    </div>
  </div>
);

export const LoginPage = () => (
  <AuthCard title="Welcome Back" subtitle="Log in to access your dashboard and history.">
    <InputField icon={Mail} label="Email Address" type="email" placeholder="you@example.com" />
    <InputField icon={Lock} label="Password" type="password" placeholder="••••••••" />
    <div className="flex justify-between items-center mb-6">
      <label className="flex items-center text-sm text-brand-600 dark:text-slate-400">
        <input type="checkbox" className="mr-2 rounded text-accent-600 focus:ring-accent-500" />
        Remember me
      </label>
      <a href="#" className="text-sm font-medium text-accent-600 hover:text-accent-500">Forgot password?</a>
    </div>
    <button className="w-full bg-accent-600 hover:bg-accent-700 text-white font-semibold py-2.5 rounded-xl transition-all hover:scale-[0.98] active:scale-95 shadow-sm mb-4">
      Sign In
    </button>
    <p className="text-center text-sm text-brand-600 dark:text-slate-400">
      Don't have an account? <Link to="/register" className="text-accent-600 hover:underline font-semibold">Sign up</Link>
    </p>
  </AuthCard>
);

export const RegisterPage = () => (
  <AuthCard title="Create an Account" subtitle="Join to get smarter legal assistance today.">
    <InputField icon={User} label="Full Name" placeholder="John Doe" />
    <InputField icon={Mail} label="Email Address" type="email" placeholder="you@example.com" />
    <InputField icon={Lock} label="Password" type="password" placeholder="••••••••" />
    <button className="w-full bg-accent-600 hover:bg-accent-700 text-white font-semibold py-2.5 rounded-xl transition-all hover:scale-[0.98] active:scale-95 shadow-sm mb-4">
      Create Account
    </button>
    <p className="text-center text-sm text-brand-600 dark:text-slate-400">
      Already have an account? <Link to="/login" className="text-accent-600 hover:underline font-semibold">Log in</Link>
    </p>
  </AuthCard>
);

export const AdminLoginPage = () => (
  <AuthCard title="Admin Portal" subtitle="Authorized personnel only.">
    <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 mb-6">
      <div className="flex items-center">
        <ShieldAlert size={20} className="text-amber-500 mr-2" />
        <p className="text-sm text-amber-800 dark:text-amber-200">
          This portal is restricted to system administrators.
        </p>
      </div>
    </div>
    <InputField icon={User} label="Admin ID" placeholder="admin_username" />
    <InputField icon={Lock} label="Admin Password" type="password" placeholder="••••••••" />
    <button className="w-full bg-brand-900 dark:bg-white dark:text-brand-900 hover:bg-brand-800 dark:hover:bg-brand-100 text-white font-semibold py-2.5 rounded-xl transition-all hover:scale-[0.98] active:scale-95 shadow-sm">
      Secure Login
    </button>
  </AuthCard>
);
