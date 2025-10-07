import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HardHat, Shield, Ruler, ArrowRight } from 'lucide-react';
import ConstructionVisual from './ConstructionVisual';

interface PremiumSectionProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'dark';
  children?: React.ReactNode;
  showVisuals?: boolean;
  backgroundImage?: string; // optional page-specific background image
}

const PremiumSection: React.FC<PremiumSectionProps> = ({ 
  title, 
  subtitle, 
  variant = 'default',
  children,
  showVisuals = false,
  backgroundImage
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const cards = cardRefs.current.filter(Boolean);
      cards.forEach((card, index) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const cardCenter = rect.top + rect.height / 2;
          
          if (cardCenter < windowHeight && cardCenter > -rect.height) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.dispatchEvent(new Event('scroll'));
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Premium background images
  const getBackgroundStyle = () => {
    if (backgroundImage) {
      return {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed'
      } as React.CSSProperties;
    }
    if (variant === 'dark') {
      return {
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(/images/construction-site.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed'
      } as React.CSSProperties;
    } else {
      return {
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/construction-equipment.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed'
      } as React.CSSProperties;
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 px-6 text-white"
      style={getBackgroundStyle()}
    >
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {title && (
          <div className="text-center mb-16">
            {subtitle && (
              <div className="text-amber-300 uppercase tracking-[0.2em] text-sm font-medium mb-4">
                {subtitle}
              </div>
            )}
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
              {title}
            </h2>
          </div>
        )}

        {children || (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: HardHat,
                title: 'Advanced Equipment',
                description: 'Cutting-edge machinery engineered for peak performance and reliability.',
                visual: 'equipment' as const
              },
              {
                icon: Shield,
                title: 'Safety Excellence',
                description: 'Industry-leading protocols that protect our teams and communities.',
                visual: 'site' as const
              },
              {
                icon: Ruler,
                title: 'Precision Engineering',
                description: 'Exacting standards that ensure every project meets our high expectations.',
                visual: 'technology' as const
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  ref={el => (cardRefs.current[index] = el)}
                  className="group relative overflow-hidden bg-white/10 border border-white/20 backdrop-blur-lg hover:bg-white/15 transition-all duration-500"
                  style={{ 
                    opacity: 0, 
                    transform: 'translateY(40px)', 
                    transition: 'all 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                >
                  {showVisuals && (
                    <div className="h-48 overflow-hidden">
                      <ConstructionVisual variant={item.visual} />
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="flex flex-col gap-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/20">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-zinc-300 leading-relaxed">{item.description}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="justify-start px-0 text-amber-300 hover:text-white transition-colors duration-300"
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PremiumSection;
