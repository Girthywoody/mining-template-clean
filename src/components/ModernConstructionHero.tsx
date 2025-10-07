import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Play, Star, Award, Users, Clock } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';

const ModernConstructionHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    setIsVisible(true);
    if (textRef.current) {
      textRef.current.style.opacity = '0';
      textRef.current.style.transform = 'translateY(32px)';
      setTimeout(() => {
        textRef.current!.style.transition = 'all 1200ms cubic-bezier(0.16, 1, 0.3, 1)';
        textRef.current!.style.opacity = '1';
        textRef.current!.style.transform = 'translateY(0)';
      }, 300);
    }
  }, []);

  const stats = [
    { icon: Award, number: "25+", label: "Years Experience" },
    { icon: Users, number: "500+", label: "Projects Completed" },
    { icon: Star, number: "98%", label: "Client Satisfaction" },
    { icon: Clock, number: "24/7", label: "Emergency Service" },
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Advanced overlay effects */}
      <div className="absolute inset-0">
        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
        
        {/* Dynamic gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1200px 800px at 30% 20%, rgba(59, 130, 246, 0.15), transparent 50%),
              radial-gradient(1000px 600px at 70% 80%, rgba(16, 185, 129, 0.1), transparent 50%),
              linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)
            `
          }}
        />
        
        {/* Animated shimmer effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30" 
          style={{
            backgroundSize: '200% 100%', 
            animation: 'shimmer 4s ease-in-out infinite'
          }} 
        />
        
        {/* Vignette effect */}
        <div className="absolute inset-0" style={{ 
          boxShadow: 'inset 0 0 200px rgba(0,0,0,0.8), inset 0 0 100px rgba(0,0,0,0.4)' 
        }} />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Badge */}
        <div className={`inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Award className="w-4 h-4 mr-2" />
          Licensed & Insured Construction Company
        </div>

        {/* Main heading */}
        <h1 
          ref={textRef}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8"
          style={{ 
            letterSpacing: '-0.02em',
            textShadow: '0 8px 32px rgba(0,0,0,0.8)',
            background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {t('construction.hero.title')}
        </h1>
        
        {/* Subtitle */}
        <p className={`text-xl md:text-2xl lg:text-3xl text-slate-200 mb-12 max-w-5xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
           style={{ textShadow: '0 4px 16px rgba(0,0,0,0.8)' }}>
          {t('construction.hero.subtitle')} 
        </p>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Button 
            size="lg" 
            className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 border border-blue-400/20"
            asChild
          >
            <Link to="/contact">
              Get Free Quote
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="px-8 py-6 text-lg font-semibold border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 shadow-xl hover:shadow-white/10 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            asChild
          >
            <Link to="/projects" className="flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>View Our Work</span>
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-blue-500/30">
                <stat.icon className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                {stat.number}
              </div>
              <div className="text-sm text-slate-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium scroll cue */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex flex-col items-center text-slate-400 group cursor-pointer">
          <span className="text-sm mb-3 font-light group-hover:text-white transition-colors">Discover Our Services</span>
          <div className="w-8 h-8 rounded-full border-2 border-slate-400 group-hover:border-white transition-colors flex items-center justify-center">
            <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
};

export default ModernConstructionHero;
