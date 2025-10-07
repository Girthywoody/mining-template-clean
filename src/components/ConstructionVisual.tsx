import React from 'react';

interface ConstructionVisualProps {
  variant: 'hero' | 'equipment' | 'site' | 'technology' | 'team';
  className?: string;
}

const ConstructionVisual: React.FC<ConstructionVisualProps> = ({ variant, className = '' }) => {
  const getVisualContent = () => {
    switch (variant) {
      case 'hero':
        return (
          <div className="w-full h-full relative overflow-hidden">
            <img 
              src="/images/construction-hero.jpg"
              alt="Construction site with crane and building skyline"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </div>
        );
      
      case 'equipment':
        return (
          <div className="w-full h-full relative overflow-hidden">
            <img 
              src="/images/construction-equipment.jpg"
              alt="Construction equipment and heavy machinery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
        );
      
      case 'site':
        return (
          <div className="w-full h-full relative overflow-hidden">
            <img 
              src="/images/construction-site.jpg"
              alt="Active construction site with workers"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
        );
      
      case 'technology':
        return (
          <div className="w-full h-full relative overflow-hidden">
            <img 
              src="/images/construction-technology.jpg"
              alt="Modern construction technology and smart city"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
        );
      
      case 'team':
        return (
          <div className="w-full h-full relative overflow-hidden">
            <img 
              src="/images/construction-team.jpg"
              alt="Construction team collaboration and planning"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
        );
      
      default:
        return (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        );
    }
  };

  return (
    <div className={`relative ${className}`}>
      {getVisualContent()}
    </div>
  );
};

export default ConstructionVisual;
