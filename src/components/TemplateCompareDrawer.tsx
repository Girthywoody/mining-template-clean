import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Monitor, Tablet, Smartphone, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Template } from '@/data/types';

interface TemplateCompareDrawerProps {
  templates: Template[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveTemplate: (template: Template) => void;
}

type DeviceType = 'desktop' | 'tablet' | 'phone';

const TemplateCompareDrawer: React.FC<TemplateCompareDrawerProps> = ({
  templates,
  isOpen,
  onClose,
  onRemoveTemplate
}) => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('desktop');

  const deviceIcons = {
    desktop: Monitor,
    tablet: Tablet,
    phone: Smartphone
  };

  const deviceSizes = {
    desktop: 'w-full h-[400px]',
    tablet: 'w-[400px] h-[533px]',
    phone: 'w-[200px] h-[356px]'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="relative w-full max-w-7xl h-[80vh] bg-white rounded-t-2xl shadow-2xl overflow-hidden"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Compare Templates</h2>
                <p className="text-slate-600">Side-by-side comparison of {templates.length} templates</p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Device Selector */}
                <div className="flex gap-2">
                  {Object.entries(deviceIcons).map(([device, Icon]) => (
                    <Button
                      key={device}
                      variant={selectedDevice === device ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedDevice(device as DeviceType)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {device.charAt(0).toUpperCase() + device.slice(1)}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-10 w-10 rounded-full hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="flex-1 overflow-auto p-6">
              <div className={`grid gap-6 ${
                templates.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' :
                templates.length === 2 ? 'grid-cols-1 lg:grid-cols-2' :
                'grid-cols-1 lg:grid-cols-3'
              }`}>
                {templates.map((template, index) => (
                  <motion.div
                    key={template.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-4"
                  >
                    {/* Template Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{template.title}</h3>
                        <p className="text-sm text-slate-600">{template.industry} • {template.style}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveTemplate(template)}
                        className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Preview Frame */}
                    <Card className="overflow-hidden">
                      <div className={`${deviceSizes[selectedDevice]} bg-slate-100 flex items-center justify-center`}>
                        <iframe
                          src={template.route}
                          className="w-full h-full border-0"
                          title={`${template.title} Preview`}
                        />
                      </div>
                    </Card>

                    {/* Template Info */}
                    <Card>
                      <CardContent className="p-4 space-y-3">
                        {/* Badges */}
                        <div className="flex gap-2">
                          <Badge variant={template.difficulty === 'Pro' ? 'destructive' : 'secondary'}>
                            {template.difficulty}
                          </Badge>
                          <Badge variant="outline">
                            Motion Level {template.motionLevel}
                          </Badge>
                        </div>

                        {/* Highlights */}
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 mb-2">Key Features</h4>
                          <div className="space-y-1">
                            {template.highlights.slice(0, 3).map((highlight, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                                <div className="w-1 h-1 bg-blue-500 rounded-full" />
                                {highlight}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Metrics */}
                        {template.metrics && (
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 mb-2">Performance</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {template.metrics.map((metric, idx) => (
                                <div key={idx} className="text-center">
                                  <div className="text-xs font-semibold text-slate-900">{metric.value}</div>
                                  <div className="text-xs text-slate-500">{metric.label}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Demo
                          </Button>
                          <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            Choose
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {templates.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-2xl font-semibold text-slate-700 mb-2">No templates to compare</h3>
                  <p className="text-slate-500">Select templates from the gallery to compare them side-by-side</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TemplateCompareDrawer;
