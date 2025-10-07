import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HardHat, Ruler, Shield, Cog } from 'lucide-react';
import ConstructionVisual from './ConstructionVisual';

const InteractiveShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const showcases = [
    {
      title: 'AI-Powered Project Management',
      subtitle: 'Intelligence at every phase',
      description: 'Advanced algorithms optimize scheduling, resource allocation, and risk management for superior project outcomes.',
      features: [
        { label: 'Safety Rating', icon: Shield, value: '99.8%' },
        { label: 'Efficiency Gain', icon: Cog, value: '+45%' },
        { label: 'Budget Accuracy', icon: Ruler, value: '±1.2%' },
        { label: 'Timeline Precision', icon: HardHat, value: '±2 days' }
      ],
      visual: 'equipment' as const
    },
    {
      title: 'Sustainable Construction',
      subtitle: 'Building greener futures',
      description: 'Eco-friendly materials and processes that reduce environmental impact while maintaining structural integrity.',
      features: [
        { label: 'Carbon Reduction', icon: Shield, value: '-65%' },
        { label: 'Energy Efficiency', icon: Cog, value: 'x4' },
        { label: 'Waste Reduction', icon: Ruler, value: '-78%' },
        { label: 'Green Certification', icon: HardHat, value: 'LEED+' }
      ],
      visual: 'site' as const
    },
    {
      title: 'Digital Reality Solutions',
      subtitle: 'Vision beyond limits',
      description: 'Cutting-edge AR/VR technology that enhances design visualization and on-site operations.',
      features: [
        { label: 'Design Accuracy', icon: Shield, value: '98.5%' },
        { label: 'Training Effectiveness', icon: Cog, value: '+85%' },
        { label: 'Error Reduction', icon: Ruler, value: '-92%' },
        { label: 'Client Satisfaction', icon: HardHat, value: '96%' }
      ],
      visual: 'technology' as const
    }
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveIndex((i) => (i + 1) % showcases.length), 9000);
    return () => clearInterval(id);
  }, []);

  const current = showcases[activeIndex];

  return (
    <section 
      className="relative py-28 px-6 text-white"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Premium overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Text */}
        <div>
          <div className="text-amber-300 uppercase tracking-[0.2em] text-sm font-medium mb-3">
            {current.subtitle}
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            {current.title}
          </h2>
          <p className="text-lg text-zinc-200 mb-10 max-w-xl leading-relaxed"
             style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            {current.description}
          </p>

          <div className="grid grid-cols-2 gap-6 max-w-xl">
            {current.features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="p-5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/20">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{f.value}</div>
                      <div className="text-zinc-300 text-sm">{f.label}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-400/20">
              Explore Technology
            </Button>
          </div>
        </div>

        {/* Construction Visual */}
        <Card className="bg-white/10 border-white/20 overflow-hidden backdrop-blur-lg hover:bg-white/15 transition-all duration-300">
          <CardContent className="p-0">
            <ConstructionVisual variant={current.visual} className="h-[420px] md:h-[520px]" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default InteractiveShowcase;
