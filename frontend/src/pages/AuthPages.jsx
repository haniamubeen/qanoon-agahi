import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Lock, User, Mail, ShieldAlert, Eye, EyeOff, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const AuthCard = ({ title, subtitle, children }) => (
  <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center items-center px-4 bg-brand-50 dark:bg-dark-bg">
    <div className="w-full max-w-md bg-brand-50 dark:bg-dark-surface p-8 rounded-2xl shadow-xl border border-brand-100 dark:border-dark-border">
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

const InputField = ({ icon: Icon, label, type = "text", placeholder, value, onChange, error, rightElement }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-brand-700 dark:text-slate-300 mb-1">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-400">
        <Icon size={18} />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`block w-full pl-10 ${rightElement ? 'pr-10' : 'pr-3'} py-2 border rounded-xl focus:ring-accent-500 focus:border-accent-500 bg-brand-50 dark:bg-dark-bg text-brand-900 dark:text-white transition-colors
          ${error ? 'border-red-400 dark:border-red-500' : 'border-brand-200 dark:border-dark-border'}`}
      />
      {rightElement && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {rightElement}
        </div>
      )}
    </div>
    {error && (
      <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5">
        <AlertCircle size={12} /> {error}
      </p>
    )}
  </div>
);

/* ── Password Strength Meter ── */
function PasswordStrength({ password }) {
  if (!password) return null;

  const checks = [
    { label: 'At least 8 characters', pass: password.length >= 8 },
    { label: 'Contains uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', pass: /[a-z]/.test(password) },
    { label: 'Contains a number', pass: /\d/.test(password) },
    { label: 'Contains special character', pass: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];
  const passedCount = checks.filter(c => c.pass).length;
  const strength = passedCount <= 2 ? 'Weak' : passedCount <= 4 ? 'Medium' : 'Strong';
  const strengthColor = passedCount <= 2 ? 'text-red-500' : passedCount <= 4 ? 'text-amber-500' : 'text-accent-600';
  const barColor = passedCount <= 2 ? 'bg-red-400' : passedCount <= 4 ? 'bg-amber-400' : 'bg-accent-500';

  return (
    <div className="mb-4 -mt-2 px-1">
      {/* Strength bar */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 h-1.5 bg-brand-200 dark:bg-dark-border rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${(passedCount / 5) * 100}%` }}
          />
        </div>
        <span className={`text-xs font-semibold ${strengthColor}`}>{strength}</span>
      </div>
      {/* Criteria list */}
      <div className="grid grid-cols-1 gap-1">
        {checks.map((check, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs">
            {check.pass
              ? <CheckCircle2 size={12} className="text-accent-500 flex-shrink-0" />
              : <XCircle size={12} className="text-brand-300 dark:text-dark-muted flex-shrink-0" />
            }
            <span className={check.pass ? 'text-accent-600 dark:text-accent-400' : 'text-brand-400 dark:text-dark-muted'}>
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Login Page ── */
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

/* ── Register Page (with validation) ── */
export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (val) => {
    if (!val.trim()) return 'Email is required';
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (val) => {
    if (!val) return 'Password is required';
    if (val.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(val)) return 'Include at least one uppercase letter';
    if (!/[a-z]/.test(val)) return 'Include at least one lowercase letter';
    if (!/\d/.test(val)) return 'Include at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(val)) return 'Include at least one special character';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    const emailErr = validateEmail(email);
    if (emailErr) newErrors.email = emailErr;
    const passErr = validatePassword(password);
    if (passErr) newErrors.password = passErr;

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  // Success state — email verification sent
  if (submitted) {
    return (
      <AuthCard title="Check Your Email" subtitle="We've sent a verification link to your inbox.">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center">
            <Mail size={28} className="text-accent-600" />
          </div>
          <p className="text-brand-600 dark:text-slate-400 text-sm leading-relaxed">
            We've sent a verification email to <strong className="text-brand-800 dark:text-white">{email}</strong>.
            Please click the link in the email to verify your account.
          </p>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-xl p-4">
            <p className="text-xs text-amber-700 dark:text-amber-400">
              💡 Can't find the email? Check your spam folder or{' '}
              <button className="underline font-semibold hover:no-underline">resend verification email</button>.
            </p>
          </div>
          <Link
            to="/complete-profile"
            className="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all hover:scale-[0.98] active:scale-95 shadow-sm mt-2"
          >
            I've Verified — Continue Setup →
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Create an Account" subtitle="Join to get smarter legal assistance today.">
      <form onSubmit={handleSubmit} noValidate>
        <InputField
          icon={User}
          label="Full Name"
          placeholder="Ahmed Khan"
          value={name}
          onChange={e => { setName(e.target.value); if (errors.name) setErrors(prev => ({ ...prev, name: '' })); }}
          error={errors.name}
        />
        <InputField
          icon={Mail}
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: '' })); }}
          error={errors.email}
        />
        <InputField
          icon={Lock}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={e => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: '' })); }}
          error={errors.password}
          rightElement={
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-brand-400 hover:text-brand-600 dark:hover:text-slate-300 transition-colors">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />
        <PasswordStrength password={password} />
        <button
          type="submit"
          className="w-full bg-accent-600 hover:bg-accent-700 text-white font-semibold py-2.5 rounded-xl transition-all hover:scale-[0.98] active:scale-95 shadow-sm mb-4"
        >
          Create Account
        </button>
      </form>
      <p className="text-center text-sm text-brand-600 dark:text-slate-400">
        Already have an account? <Link to="/login" className="text-accent-600 hover:underline font-semibold">Log in</Link>
      </p>
    </AuthCard>
  );
}

/* ── Admin Login Page ── */
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
