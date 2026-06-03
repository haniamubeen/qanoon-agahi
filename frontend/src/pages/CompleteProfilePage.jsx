import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, MapPin, Calendar, Phone, User, Briefcase, CheckCircle2, ChevronRight } from 'lucide-react';

const cities = [
  "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad",
  "Multan", "Peshawar", "Quetta", "Hyderabad", "Sialkot",
  "Gujranwala", "Bahawalpur", "Sargodha", "Sukkur", "Larkana", "Other"
];

const professions = [
  "Student", "Legal Professional", "Business Owner", "Government Employee",
  "Private Employee", "Self-employed", "Retired", "Other"
];

export default function CompleteProfilePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '',
    city: '', age: '', gender: '',
    profession: '', legalInterests: [],
  });
  const [errors, setErrors] = useState({});

  const legalTopics = [
    "Property Law", "Family Law", "Labour Rights", "Criminal Law",
    "Consumer Protection", "Business Registration", "Tax Law", "Constitutional Rights"
  ];

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const toggleInterest = (topic) => {
    setForm(prev => ({
      ...prev,
      legalInterests: prev.legalInterests.includes(topic)
        ? prev.legalInterests.filter(t => t !== topic)
        : [...prev.legalInterests, topic]
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (form.phone && !/^(\+92|0)?3\d{9}$/.test(form.phone.replace(/[\s-]/g, ''))) {
        newErrors.phone = 'Enter a valid Pakistani phone number';
      }
    }
    if (step === 2) {
      if (!form.city) newErrors.city = 'Please select your city';
      if (!form.age || form.age < 13 || form.age > 120) newErrors.age = 'Enter a valid age (13-120)';
      if (!form.gender) newErrors.gender = 'Please select your gender';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    // Mock submission
    navigate('/demo');
  };

  const steps = [
    { num: 1, label: "Personal Info" },
    { num: 2, label: "Location & Demographics" },
    { num: 3, label: "Preferences" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-brand-50 dark:bg-dark-bg flex flex-col items-center">

      {/* Header */}
      <div className="text-center mb-8 max-w-lg">
        <div className="inline-flex items-center justify-center bg-accent-600 p-3 rounded-xl shadow-md mb-4">
          <Scale size={24} className="text-white" />
        </div>
        <h1 className="text-2xl font-extrabold text-brand-900 dark:text-white mb-2">Complete Your Profile</h1>
        <p className="text-sm text-brand-500 dark:text-slate-400">
          Your email has been verified! Just a few more details to personalize your experience.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-0 mb-10 w-full max-w-md">
        {steps.map((step, idx) => (
          <React.Fragment key={step.num}>
            <div className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                ${currentStep > step.num
                  ? 'bg-accent-600 text-white shadow-md'
                  : currentStep === step.num
                    ? 'bg-accent-600 text-white shadow-lg shadow-accent-500/30 scale-110'
                    : 'bg-brand-200 dark:bg-dark-border text-brand-500 dark:text-slate-400'
                }`}
              >
                {currentStep > step.num ? <CheckCircle2 size={18} /> : step.num}
              </div>
              <span className={`text-xs mt-2 font-medium text-center ${currentStep >= step.num ? 'text-accent-700 dark:text-accent-400' : 'text-brand-400 dark:text-dark-muted'}`}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`h-0.5 flex-1 -mt-5 mx-1 rounded-full transition-all duration-500 ${currentStep > step.num ? 'bg-accent-500' : 'bg-brand-200 dark:bg-dark-border'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form Card */}
      <div className="w-full max-w-lg bg-brand-50 dark:bg-dark-surface border border-brand-100 dark:border-dark-border rounded-2xl shadow-xl p-8">

        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-bold text-brand-900 dark:text-white flex items-center gap-2">
              <User size={18} className="text-accent-600" /> Personal Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-700 dark:text-slate-300 mb-1">First Name *</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={e => updateField('firstName', e.target.value)}
                  placeholder="Ahmed"
                  className={`w-full px-4 py-2.5 border rounded-xl bg-brand-50 dark:bg-dark-bg text-brand-900 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500
                    ${errors.firstName ? 'border-red-400 dark:border-red-500' : 'border-brand-200 dark:border-dark-border'}`}
                />
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 dark:text-slate-300 mb-1">Last Name *</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={e => updateField('lastName', e.target.value)}
                  placeholder="Khan"
                  className={`w-full px-4 py-2.5 border rounded-xl bg-brand-50 dark:bg-dark-bg text-brand-900 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500
                    ${errors.lastName ? 'border-red-400 dark:border-red-500' : 'border-brand-200 dark:border-dark-border'}`}
                />
                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 dark:text-slate-300 mb-1">Phone Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => updateField('phone', e.target.value)}
                  placeholder="+92 3XX XXXXXXX"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-xl bg-brand-50 dark:bg-dark-bg text-brand-900 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500
                    ${errors.phone ? 'border-red-400 dark:border-red-500' : 'border-brand-200 dark:border-dark-border'}`}
                />
              </div>
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Location & Demographics */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-bold text-brand-900 dark:text-white flex items-center gap-2">
              <MapPin size={18} className="text-accent-600" /> Location & Demographics
            </h2>
            <div>
              <label className="block text-sm font-medium text-brand-700 dark:text-slate-300 mb-1">City *</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" />
                <select
                  value={form.city}
                  onChange={e => updateField('city', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-xl bg-brand-50 dark:bg-dark-bg text-brand-900 dark:text-white appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500
                    ${errors.city ? 'border-red-400 dark:border-red-500' : 'border-brand-200 dark:border-dark-border'}`}
                >
                  <option value="">Select your city</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-700 dark:text-slate-300 mb-1">Age *</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" />
                  <input
                    type="number"
                    min="13"
                    max="120"
                    value={form.age}
                    onChange={e => updateField('age', e.target.value)}
                    placeholder="25"
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-xl bg-brand-50 dark:bg-dark-bg text-brand-900 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500
                      ${errors.age ? 'border-red-400 dark:border-red-500' : 'border-brand-200 dark:border-dark-border'}`}
                  />
                </div>
                {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 dark:text-slate-300 mb-1">Gender *</label>
                <select
                  value={form.gender}
                  onChange={e => updateField('gender', e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-xl bg-brand-50 dark:bg-dark-bg text-brand-900 dark:text-white appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500
                    ${errors.gender ? 'border-red-400 dark:border-red-500' : 'border-brand-200 dark:border-dark-border'}`}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Prefer not to say</option>
                </select>
                {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 dark:text-slate-300 mb-1">Profession</label>
              <div className="relative">
                <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" />
                <select
                  value={form.profession}
                  onChange={e => updateField('profession', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-brand-200 dark:border-dark-border rounded-xl bg-brand-50 dark:bg-dark-bg text-brand-900 dark:text-white appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500"
                >
                  <option value="">Select profession</option>
                  {professions.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-bold text-brand-900 dark:text-white flex items-center gap-2">
              <Scale size={18} className="text-accent-600" /> Legal Interests
            </h2>
            <p className="text-sm text-brand-500 dark:text-slate-400">
              Select topics you're most interested in. This helps us personalize your experience.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {legalTopics.map(topic => (
                <button
                  key={topic}
                  onClick={() => toggleInterest(topic)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-200 text-left
                    ${form.legalInterests.includes(topic)
                      ? 'bg-accent-50 dark:bg-accent-900/20 border-accent-300 dark:border-accent-700 text-accent-700 dark:text-accent-400 shadow-sm'
                      : 'bg-brand-50 dark:bg-dark-bg border-brand-200 dark:border-dark-border text-brand-600 dark:text-slate-400 hover:border-brand-300 dark:hover:border-slate-600'
                    }`}
                >
                  <span className="mr-2">{form.legalInterests.includes(topic) ? '✓' : '○'}</span>
                  {topic}
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-accent-50 dark:bg-accent-900/10 border border-accent-200 dark:border-accent-800/40 rounded-xl p-4 mt-4">
              <p className="text-xs font-semibold text-accent-700 dark:text-accent-400 uppercase tracking-wider mb-2">Profile Summary</p>
              <div className="text-sm text-brand-700 dark:text-slate-300 space-y-1">
                <p><span className="font-medium">Name:</span> {form.firstName} {form.lastName}</p>
                {form.city && <p><span className="font-medium">City:</span> {form.city}</p>}
                {form.profession && <p><span className="font-medium">Profession:</span> {form.profession}</p>}
                {form.legalInterests.length > 0 && (
                  <p><span className="font-medium">Interests:</span> {form.legalInterests.join(', ')}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand-100 dark:border-dark-border">
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className="px-5 py-2.5 text-sm font-semibold text-brand-600 dark:text-slate-300 hover:text-brand-800 dark:hover:text-white transition-colors"
            >
              ← Back
            </button>
          ) : <div />}

          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1 px-6 py-2.5 bg-accent-600 hover:bg-accent-700 text-white rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-1 px-6 py-2.5 bg-accent-600 hover:bg-accent-700 text-white rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-accent-500/20"
            >
              Complete Setup <CheckCircle2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
