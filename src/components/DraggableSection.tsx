import React, { useState, useRef } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Trash2, 
  Edit3, 
  GripVertical, 
  Plus, 
  MoveUp, 
  MoveDown,
  Menu,
  Copy
} from 'lucide-react';
import { editStorage } from '@/lib/localStorage';

interface DraggableSectionProps {
  children: React.ReactNode;
  className?: string;
  sectionId: string;
  page: string;
  canDelete?: boolean;
  canEdit?: boolean;
  canReorder?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

const DraggableSection: React.FC<DraggableSectionProps> = ({
  children,
  className = '',
  sectionId,
  page,
  canDelete = true,
  canEdit = true,
  canReorder = true,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown
}) => {
  const { isEditMode } = useAdmin();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  if (!isEditMode) {
    return <div className={className}>{children}</div>;
  }

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', `${page}:${sectionId}`);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={`draggable-section relative group ${className} ${
        isDragging ? 'opacity-50' : ''
      }`}
      ref={dragRef}
    >
      {/* Section Controls */}
      <div className="absolute -top-8 -left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white rounded-lg shadow-lg p-1 border">
        {/* Drag Handle */}
        {canReorder && (
          <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="cursor-grab hover:cursor-grabbing p-1 hover:bg-gray-100 rounded"
            title="Drag to reorder"
          >
            <GripVertical className="w-4 h-4 text-gray-600" />
          </div>
        )}
        
        {/* Action Menu */}
        <div className="dropdown relative">
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0"
            onClick={() => setShowActionMenu(!showActionMenu)}
            title="Section options"
          >
            <Menu className="w-4 h-4 text-gray-600" />
          </Button>
          
          {showActionMenu && (
            <div className="absolute left-0 top-full mt-1 bg-white border rounded-lg shadow-lg py-1 z-20 min-w-32">
              {canEdit && (
                <button
                  onClick={() => {
                    onEdit?.();
                    setShowActionMenu(false);
                  }}
                  className="w-full px-3 py-1 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <Edit3 className="w-3 h-3" />
                  Edit Section
                </button>
              )}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${page}:${sectionId}`);
                  setShowActionMenu(false);
                }}
                className="w-full px-3 py-1 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <Copy className="w-3 h-3" />
                Copy ID
              </button>
              {onMoveUp && (
                <button
                  onClick={() => {
                    onMoveUp();
                    setShowActionMenu(false);
                  }}
                  className="w-full px-3 py-1 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <MoveUp className="w-3 h-3" />
                  Move Up
                </button>
              )}
              {onMoveDown && (
                <button
                  onClick={() => {
                    onMoveDown();
                    setShowActionMenu(false);
                  }}
                  className="w-full px-3 py-1 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <MoveDown className="w-3 h-3" />
                  Move Down
                </button>
              )}
              {canDelete && (
                <>
                  <div className="border-t my-1"></div>
                  <button
                    onClick={() => {
                      setShowDeleteDialog(true);
                      setShowActionMenu(false);
                    }}
                    className="w-full px-3 py-1 text-left text-sm hover:bg-red-100 text-red-600 flex items-center gap-2"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete Section
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Quick Delete Button */}
        {canDelete && (
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0 text-red-600 hover:bg-red-100"
            onClick={() => setShowDeleteDialog(true)}
            title="Delete section"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        )}
      </div>

      {/* Section Content */}
      <div 
        className={`${
          isEditMode ? 'border-2 border-dashed border-yellow-300 hover:border-yellow-400 transition-all rounded-lg p-2 min-h-20' : ''
        }`}
      >
        {children}
      </div>

      {/* Section Label */}
      {isEditMode && (
        <div className="absolute -bottom-8 left-0 text-xs text-gray-500 bg-white px-2 py-1 rounded border shadow-sm">
          Section: {sectionId}
        </div>
      )}

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
              Are you sure you want to delete this section?
            </p>
            <div className="bg-gray-50 p-3 rounded text-sm font-mono">
              Page: {page}<br />
              Section ID: {sectionId}
            </div>
            <p className="text-xs text-gray-500">
              This action only affects your local view and will not modify the actual website files.
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
                Delete Locally
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
      
      {/* Click outside to close menu */}
      {showActionMenu && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowActionMenu(false)}
        />
      )}
    </div>
  );
};

export default DraggableSection;
