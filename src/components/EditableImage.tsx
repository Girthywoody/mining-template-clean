import React, { useState, useRef } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Upload, Pencil, Check, X, Image as ImageIcon } from 'lucide-react';

interface EditableImageProps {
  src: string;
  alt: string;
  onChange?: (newSrc: string) => void;
  className?: string;
  placeholder?: string;
}

const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  onChange,
  className = '',
  placeholder = 'Enter image URL...'
}) => {
  const { isEditMode } = useAdmin();
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState(src);
  const [tempUrl, setTempUrl] = useState(imageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setTempUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (url: string) => {
    setTempUrl(url);
  };

  const handleSave = () => {
    onChange?.(tempUrl);
    setImageUrl(tempUrl);
    setShowImageDialog(false);
  };

  const handleCancel = () => {
    setTempUrl(imageUrl);
    setShowImageDialog(false);
  };

  return (
    <div className="editable-image relative group">
      <img 
        src={imageUrl} 
        alt={alt} 
        className={`${className} ${isEditMode ? 'hover:ring-2 hover:ring-yellow-400 hover:ring-opacity-50 transition-all cursor-pointer' : ''}`}
        onClick={isEditMode ? () => setShowImageDialog(true) : undefined}
      />
      
      {isEditMode && (
        <Button
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 bg-white/90 hover:bg-white"
          variant="ghost"
          onClick={() => setShowImageDialog(true)}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      )}

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Edit Image
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input
                type="url"
                value={tempUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder={placeholder}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Or upload file</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full gap-2"
              >
                <Upload className="w-4 h-4" />
                Choose File
              </Button>
            </div>

            {tempUrl && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Preview</label>
                <div className="border rounded p-4 bg-gray-50">
                  <img 
                    src={tempUrl} 
                    alt="Preview" 
                    className="max-w-full max-h-48 object-contain mx-auto"
                    onError={() => setTempUrl(imageUrl)}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} className="flex-1 gap-2">
                <Check className="w-4 h-4" />
                Save
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel} className="gap-2">
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditableImage;
