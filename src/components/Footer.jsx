import React from 'react';
import { Scale, Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-300 dark:bg-dark-surface dark:border-t dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-accent-600 p-1.5 rounded-lg">
                <Scale size={20} className="text-white" />
              </div>
              <span className="font-bold text-lg text-white">AI Legal</span>
            </Link>
            <p className="text-sm text-brand-400 mb-4">
              Empowering individuals and professionals with accessible, intelligent legal guidance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Twitter size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><Github size={18} /></a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/demo" className="hover:text-white transition-colors">Interactive Demo</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/team" className="hover:text-white transition-colors">Our Team</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-800 dark:border-dark-border pt-8 pb-4">
          <div className="bg-brand-950 dark:bg-dark-bg p-6 rounded-2xl border border-brand-800 dark:border-dark-border text-center">
            <h4 className="text-white font-semibold mb-2">AI Transparency & Data Privacy</h4>
            <p className="text-xs text-brand-400 leading-relaxed max-w-3xl mx-auto">
              Our AI operates completely locally or on securely encrypted servers. Your queries are never used to train third-party models. We employ zero-retention policies for unauthenticated users, ensuring your legal inquiries remain strictly confidential. This platform provides educational awareness and is not a substitute for professional legal advice.
            </p>
          </div>
        </div>
        
        <div className="text-center text-xs text-brand-500 mt-4">
          &copy; {new Date().getFullYear()} AI Legal Right Awareness. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
