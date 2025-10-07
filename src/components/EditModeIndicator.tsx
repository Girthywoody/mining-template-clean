import React from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Edit3, Eye, EyeOff } from 'lucide-react';

const EditModeIndicator: React.FC = () => {
  const { isEditMode } = useAdmin();

  if (!isEditMode) return null;

  return (
    <div className="edit-mode-indicator flex items-center gap-2">
      <Edit3 className="w-4 h-4" />
      Edit Mode Active
      <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
    </div>
  );
};

export default EditModeIndicator;
