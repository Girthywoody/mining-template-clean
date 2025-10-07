import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Trash2, Edit3, GripVertical } from 'lucide-react';

interface EditableSectionProps {
  children: React.ReactNode;
  className?: string;
  onDelete?: () => void;
  onEdit?: () => void;
  canDelete?: boolean;
  canEdit?: boolean;
}

const EditableSection: React.FC<EditableSectionProps> = ({
  children,
  className = '',
  onDelete,
  onEdit,
  canDelete = true,
  canEdit = true
}) => {
  const { isEditMode } = useAdmin();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!isEditMode) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`editable-section relative group ${className}`}>
      {/* Edit Mode Indicators */}
      <div className="absolute -top-4 -left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0 bg-white/90 hover:bg-white text-gray-600 hover:text-blue-600"
          onClick={onEdit}
          disabled={!canEdit}
          title="Edit Section"
        >
          <Edit3 className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0 bg-white/90 hover:bg-white text-gray-600 hover:text-red-600"
          onClick={() => setShowDeleteDialog(true)}
          disabled={!canDelete}
          title="Delete Section"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0 bg-white/90 hover:bg-white text-gray-600 cursor-move"
          title="Drag to reorder"
        >
          <GripVertical className="w-3 h-3" />
        </Button>
      </div>

      {/* Section Content */}
      <div className={`${isEditMode ? 'border border-dashed border-yellow-300 border-opacity-50 hover:border-opacity-100 transition-all rounded-lg' : ''}`}>
        {children}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="w-5 h-5" />
              Delete Section
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this section? This action cannot be undone.
            </p>
            
            <div className="flex gap-2 pt-2">
              <Button 
                onClick={() => {
                  onDelete?.();
                  setShowDeleteDialog(false);
                }}
                variant="destructive"
                className="flex-1"
              >
                Delete
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditableSection;
