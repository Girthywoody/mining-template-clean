import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { X, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { submitLead, formatLeadData } from '@/lib/emailService';

interface FormData {
  projectType: string;
  businessName: string;
  industry: string;
  email: string;
  phone: string;
}

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projectTypes = [
  { id: 'new-website', label: 'New Website', icon: '🌐' },
  { id: 'redesign', label: 'Redesign', icon: '🎨' },
  { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
  { id: 'other', label: 'Other', icon: '💡' }
];

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Real Estate',
  'Construction',
  'Food & Beverage',
  'Transportation',
  'Entertainment',
  'Media & Marketing',
  'Professional Services',
  'Consulting',
  'Legal Services',
  'Non-Profit',
  'Government',
  'Agriculture',
  'Energy',
  'Telecommunications',
  'Automotive',
  'Fashion',
  'Beauty & Wellness',
  'Sports & Fitness',
  'Travel & Tourism',
  'Hospitality',
  'E-commerce',
  'Software Development',
  'Design & Creative',
  'Other'
];

const IndustryDropdown: React.FC<{
  register: any;
  name: string;
  error?: string;
  required?: boolean;
}> = ({ register, name, error, required = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState('');

  const { onChange, onBlur, ref } = register(name, { required: required ? 'Industry is required' : false });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setHasValue(value.length > 0);
    setShowOtherInput(value === 'Other');
    onChange(e);
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherValue(e.target.value);
    // Create a synthetic event for the select field
    const syntheticEvent = {
      target: { value: e.target.value },
      currentTarget: { value: e.target.value }
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(syntheticEvent);
  };

  return (
    <div className="relative">
      <motion.select
        ref={ref}
        name={name}
        className={`w-full px-4 py-4 pr-8 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all duration-300 appearance-none ${
          error ? 'border-red-400' : ''
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur(e);
        }}
        onChange={handleSelectChange}
      >
        <option value="" className="bg-gray-800 text-white">Select Industry</option>
        {industries.map((industry) => (
          <option key={industry} value={industry} className="bg-gray-800 text-white">
            {industry}
          </option>
        ))}
      </motion.select>
      
      {/* Custom dropdown arrow */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {showOtherInput && (
        <motion.input
          type="text"
          placeholder="Please specify..."
          value={otherValue}
          onChange={handleOtherInputChange}
          className="w-full mt-2 px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-blue-400 transition-all duration-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        />
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-0 text-red-400 text-sm"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

const ParticleBurst: React.FC<{ trigger: boolean }> = ({ trigger }) => {
  const particles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <AnimatePresence>
      {trigger && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ 
                x: '50%', 
                y: '50%', 
                opacity: 1,
                scale: 0
              }}
              animate={{
                x: `calc(50% + ${Math.cos((particle * 30) * Math.PI / 180) * 60}px)`,
                y: `calc(50% + ${Math.sin((particle * 30) * Math.PI / 180) * 60}px)`,
                opacity: 0,
                scale: 1
              }}
              transition={{
                duration: 0.8,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

const FloatingLabelInput: React.FC<{
  label: string;
  type?: string;
  register: any;
  name: string;
  error?: string;
  required?: boolean;
}> = ({ label, type = 'text', register, name, error, required = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  // Add proper validation for required fields
  const getValidationRules = () => {
    if (required) {
      return {
        required: `${label} is required`,
        ...(name === 'email' && {
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Please enter a valid email address'
          }
        }),
        ...(name === 'phone' && {
          pattern: {
            value: /^[\+]?[1-9][\d]{0,15}$/,
            message: 'Please enter a valid phone number'
          }
        })
      };
    }
    return {};
  };

  // Get the register function properly
  const { onChange, onBlur, ref } = register(name, getValidationRules());

  return (
    <div className="relative">
      <motion.input
        ref={ref}
        name={name}
        type={type}
        className={`w-full px-4 pt-6 pb-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-blue-400 transition-all duration-300 ${
          error ? 'border-red-400' : ''
        }`}
        placeholder={label}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
          onBlur(e);
        }}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0);
          onChange(e);
        }}
      />
      <motion.label
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isFocused || hasValue ? 'text-blue-400 text-sm top-2' : 'text-white/60 top-4'
        }`}
        animate={{
          y: isFocused || hasValue ? -8 : 0,
          fontSize: isFocused || hasValue ? '0.875rem' : '1rem'
        }}
      >
        {label}
      </motion.label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-0 text-red-400 text-sm"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showParticleBurst, setShowParticleBurst] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [3, -3]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-3, 3]));

  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues } = useForm<FormData>({
    mode: 'onChange', // Enable real-time validation
    defaultValues: {
      projectType: '',
      businessName: '',
      industry: '',
      email: '',
      phone: ''
    }
  });

  const projectType = watch('projectType');
  const email = watch('email');
  const phone = watch('phone');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!modalRef.current) return;
    
    const rect = modalRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setShowParticleBurst(true);
    
    try {
      const leadData = formatLeadData(data);
      const success = await submitLead(leadData);
      
      if (success) {
        setIsSubmitting(false);
        setShowSuccess(true);
        
        // Auto close after 2 seconds
        setTimeout(() => {
          onClose();
          setShowSuccess(false);
          setCurrentStep(1);
          setShowParticleBurst(false);
        }, 2000);
      } else {
        setIsSubmitting(false);
        setShowParticleBurst(false);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      setShowParticleBurst(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canSubmit = !!email && !!phone && !errors.email && !errors.phone && !isSubmitting;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Backdrop with blur and gradient */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Gradient glow behind modal */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-2xl bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              mouseX.set(0);
              mouseY.set(0);
            }}
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.16, 1, 0.3, 1],
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-4 right-4 z-10 p-2 text-white/60 hover:text-white transition-colors"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Success Screen */}
            <AnimatePresence>
              {showSuccess ? (
                <motion.div
                  className="flex flex-col items-center justify-center p-12 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                  <motion.h2
                    className="text-3xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Thanks! We'll be in touch soon.
                  </motion.h2>
                </motion.div>
              ) : (
                <motion.div
                  className="p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Header */}
                  <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
                      Let's Bring Your Business Online
                    </h2>
                    <p className="text-white/80 text-lg">
                      Answer a few quick questions and we'll build your custom web solution.
                    </p>
                  </motion.div>

                  {/* Progress indicator */}
                  <motion.div
                    className="flex justify-center mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <motion.div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            step <= currentStep
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                              : 'bg-white/20 text-white/60'
                          }`}
                          animate={{ scale: step === currentStep ? 1.1 : 1 }}
                        >
                          {step}
                        </motion.div>
                        {step < 3 && (
                          <div className={`w-12 h-0.5 mx-2 ${
                            step < currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-white/20'
                          }`} />
                        )}
                      </div>
                    ))}
                  </motion.div>

                  {/* Form Steps */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Step 1: Project Type */}
                    <AnimatePresence mode="wait">
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          className="space-y-6"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-xl font-semibold text-white mb-4">What type of project are you looking for?</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {projectTypes.map((type) => (
                              <motion.button
                                key={type.id}
                                type="button"
                                className={`p-4 rounded-xl border transition-all duration-300 ${
                                  projectType === type.id
                                    ? 'border-blue-400 bg-blue-500/20 text-white'
                                    : 'border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10'
                                }`}
                                onClick={() => setValue('projectType', type.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="text-2xl mb-2">{type.icon}</div>
                                <div className="font-medium">{type.label}</div>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Step 2: Business Info */}
                    <AnimatePresence mode="wait">
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          className="space-y-6"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-xl font-semibold text-white mb-4">Tell us about your business</h3>
                          <div className="space-y-6">
                            <FloatingLabelInput
                              label="Business Name"
                              register={register}
                              name="businessName"
                              error={errors.businessName?.message}
                              required
                            />
                            <IndustryDropdown
                              register={register}
                              name="industry"
                              error={errors.industry?.message}
                              required
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Step 3: Contact Info */}
                    <AnimatePresence mode="wait">
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          className="space-y-6"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-xl font-semibold text-white mb-4">How can we reach you?</h3>
                          <div className="space-y-6">
                            <FloatingLabelInput
                              label="Email Address"
                              type="email"
                              register={register}
                              name="email"
                              error={errors.email?.message}
                              required
                            />
                            <FloatingLabelInput
                              label="Phone Number"
                              type="tel"
                              register={register}
                              name="phone"
                              error={errors.phone?.message}
                              required
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <motion.div
                      className="flex justify-between mt-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-50"
                      >
                        Previous
                      </Button>

                      {currentStep < 3 ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={currentStep === 1 && !projectType}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-2 rounded-xl font-semibold disabled:opacity-50"
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={!canSubmit}
                          className="relative bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-2 rounded-xl font-semibold disabled:opacity-50 overflow-hidden"
                        >
                          <ParticleBurst trigger={showParticleBurst} />
                          {isSubmitting ? (
                            <motion.div
                              className="flex items-center gap-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <motion.div
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              />
                              Submitting...
                            </motion.div>
                          ) : (
                            <motion.div
                              className="flex items-center gap-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <Sparkles className="w-4 h-4" />
                              Let's Build Something Great
                            </motion.div>
                          )}
                        </Button>
                      )}
                    </motion.div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GetStartedModal;
