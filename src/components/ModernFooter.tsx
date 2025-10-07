import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Github, 
  Instagram,
  ArrowUp,
  HardHat,
  Building2,
  Hammer,
  Cog
} from 'lucide-react';
import AdminButton from './AdminButton';

const ModernFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    Company: [
      { label: 'About Us', path: '/about' },
      { label: 'Services', path: '/services' },
      { label: 'Projects', path: '/projects' },
      { label: 'Contact', path: '/contact' }
    ],
    Services: [
      { label: 'Web Development', path: '/services' },
      { label: 'Mining Websites', path: '/services' },
      { label: 'Construction Sites', path: '/services' },
      { label: 'Custom Solutions', path: '/services' }
    ],
    Portfolio: [
      { label: 'Our Work', path: '/projects' },
      { label: 'Mining Sites', path: '/projects' },
      { label: 'Construction', path: '/projects' },
      { label: 'Business Sites', path: '/projects' }
    ],
    Resources: [
      { label: 'Project Gallery', path: '/projects' },
      { label: 'Web Tips', path: '/news' },
      { label: 'Industry Insights', path: '/news' },
      { label: 'Support', path: '/contact' }
    ]
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-3"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full opacity-3"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
            animation: 'float 6s ease-in-out infinite reverse'
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20"
                >
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight">Sudbury Construction Co.</span>
              </div>
              
              <p className="text-zinc-400 leading-relaxed max-w-md">
                Building premium web solutions for mining and construction businesses. 
                Professional websites that drive results and reflect your industry expertise.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-zinc-300">
                  <MapPin className="w-5 h-5 text-zinc-400" />
                  <span>Northern Ontario, Canada</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <Phone className="w-5 h-5 text-zinc-400" />
                  <span>+1 (705) 562-6876</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <Mail className="w-5 h-5 text-zinc-400" />
                  <span>joshua-law@hotmail.com</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="group w-10 h-10 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:border-white/20 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {category}
                </h3>
                {links.map((link: any) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="block text-zinc-400 hover:text-white transition-all duration-300 hover:translate-x-1 transform"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="border-t border-white/10 pt-12 mb-12">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-zinc-400 mb-8">
                Get web development insights, project updates, and industry trends delivered to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-zinc-400 focus:outline-none focus:border-white/20 transition-colors"
                />
                <button className="px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-zinc-400 text-sm">
              © 2024 Sudbury Construction Co. All rights reserved.
            </div>
            
            <div className="flex gap-6 text-sm">
              <Link to="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Admin Button */}
          <div className="flex justify-center mt-4">
            <AdminButton />
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-white text-black hover:bg-zinc-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </footer>
  );
};

export default ModernFooter;
