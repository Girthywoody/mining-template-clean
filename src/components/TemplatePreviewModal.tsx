import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Template } from '@/data/types';

interface TemplatePreviewModalProps {
  template: Template | null;
  onClose: () => void;
}

type DeviceType = 'desktop' | 'tablet' | 'phone';

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  onClose
}) => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('desktop');
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    // Set initial path when template changes
    if (template) {
      setCurrentPath(template.route);
    }
  }, [template]);

  useEffect(() => {
    // Handle navigation messages from iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'navigate') {
        // Update the iframe src to navigate within the template
        const newPath = event.data.path;
        if (template) {
          // Handle template home navigation (e.g., /templates/modern-mining)
          if (newPath.startsWith('/templates/') && newPath.endsWith(`/${template.slug}`)) {
            setCurrentPath(template.route);
          }
          // Handle root home navigation (/)
          else if (newPath === '/') {
            setCurrentPath(template.route);
          } 
          // Handle other paths within the template
          else {
            const newUrl = `${template.route}${newPath}`;
            setCurrentPath(newUrl);
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [template]);

  if (!template) return null;

  const deviceIcons = {
    desktop: Monitor,
    tablet: Tablet,
    phone: Smartphone
  };

  const deviceSizes = {
    desktop: 'w-full h-[80vh]',
    tablet: 'w-[768px] h-[90vh] mx-auto',
    phone: 'w-[375px] h-[90vh] mx-auto'
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-[95vw] h-[95vh] bg-white rounded-xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-slate-900">{template.title}</h2>
              <div className="flex gap-2">
                {Object.entries(deviceIcons).map(([device, Icon]) => (
                  <Button
                    key={device}
                    variant={selectedDevice === device ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDevice(device as DeviceType)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="capitalize">{device}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-10 w-10 rounded-full hover:bg-slate-100 text-slate-700 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Preview Frame */}
          <div className="flex-1 p-4 bg-gradient-to-br from-slate-100 to-slate-200 overflow-auto">
            <div className="flex justify-center h-full">
              <div className={`${deviceSizes[selectedDevice]} bg-white rounded-lg shadow-xl overflow-hidden border border-slate-200`}>
                <iframe
                  src={currentPath || template.route}
                  className="w-full h-full border-0"
                  title={`${template.title} Preview`}
                  disablePictureInPicture
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TemplatePreviewModal;
