import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Check, X, Save } from 'lucide-react';
import { editStorage } from '@/lib/localStorage';

interface EditableTextProps {
  children: string;
  onChange?: (newValue: string) => void;
  className?: string;
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'button';
  placeholder?: string;
  // New props for persistent editing
  page?: string;
  sectionId?: string;
  fieldId?: string;
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  children,
  onChange,
  className = '',
  as: Component = 'span',
  placeholder = 'Enter text...',
  page,
  sectionId,
  fieldId,
  multiline = false
}) => {
  const { isEditMode } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  
  // Get stored value or use default
  const storedValue = page && sectionId && fieldId 
    ? editStorage.getFieldContent(page, sectionId, fieldId, children)
    : children;
  
  const [editValue, setEditValue] = useState(storedValue);

  const handleSave = () => {
    if (page && sectionId && fieldId) {
      // Save to local storage
      editStorage.setContent(page, sectionId, fieldId, editValue);
    }
    
    // Call onChange callback if provided
    onChange?.(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(storedValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // If not in edit mode, just display the content
  if (!isEditMode) {
    return <Component className={className}>{storedValue}</Component>;
  }

  return (
    <div className="editable-text relative group inline-block">
      {isEditing ? (
        <div className="flex items-start gap-2 w-full min-w-64">
          {multiline ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              autoFocus
            />
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1"
              autoFocus
            />
          )}
          <div className="flex flex-col gap-1">
            <Button
              size="sm"
              onClick={handleSave}
              className="h-8 px-2 text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100"
              variant="ghost"
              title="Save (Enter)"
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleCancel}
              className="h-8 px-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100"
              variant="ghost"
              title="Cancel (Esc)"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 group">
          <Component className={`${className} hover:bg-yellow-100 dark:hover:bg-yellow-900 cursor-pointer transition-colors rounded px-1 py-0.5 relative`}>
            {storedValue}
            {/* Edit indicator badge */}
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              EDIT
            </span>
          </Component>
          <Button
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 bg-white shadow-sm border"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            title="Edit this text"
          >
            <Pencil className="w-3 h-3" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditableText;
