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
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Mining operations with heavy equipment"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </div>
        );
      
      case 'equipment':
        return (
          <div className="w-full h-full relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Mining equipment and heavy machinery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
        );
      
      case 'site':
        return (
          <div className="w-full h-full relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Active mining site with workers"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
        );
      
      case 'technology':
        return (
          <div className="w-full h-full relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Modern mining technology and automation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
        );
      
      case 'team':
        return (
          <div className="w-full h-full relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Mining team collaboration and planning"
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
