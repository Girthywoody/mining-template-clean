import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { AlertCircle, Lock, Eye, EyeOff, Settings, Shield, Minus, Plus, Database } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import AdminDashboard from './AdminDashboard';

const AdminButton: React.FC = () => {
  const { isAuthenticated, isEditMode, login, logout, toggleEditMode } = useAdmin();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleSuccess = () => {
    login();
    setShowPasswordDialog(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPasswordDialog(true)}
          className="text-xs gap-1 border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50 dark:border-yellow-800 dark:hover:border-yellow-700 dark:hover:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300"
        >
          <Shield className="w-3 h-3" />
          Admin
        </Button>
        
        <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Admin Access
              </DialogTitle>
              <DialogDescription>
                Enter the admin password to access edit mode
              </DialogDescription>
            </DialogHeader>
            
            <AdminPasswordForm 
              onSubmit={() => handleSuccess()} 
              onCancel={() => setShowPasswordDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <div className="flex gap-2">
      <Button
        variant={isEditMode ? "default" : "outline"}
        size="sm"
        onClick={toggleEditMode}
        className={`text-xs gap-1 ${isEditMode 
          ? 'bg-green-600 hover:bg-green-700 text-white' 
          : 'border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:border-green-700 dark:hover:bg-green-900/20 text-green-700 dark:text-green-300'
        }`}
      >
        {isEditMode ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        Edit Mode
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowDashboard(true)}
        className="text-xs gap-1 border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-700 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-300"
        title="Admin Dashboard"
      >
        <Database className="w-3 h-3" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={logout}
        className="text-xs gap-1 border-red-200 hover:border-red-300 hover:bg-red-50 dark:border-red-800 dark:hover:border-red-700 dark:hover:bg-red-900/20 text-red-700 dark:text-red-300"
        title="Logout"
      >
        <Settings className="w-3 h-3" />
      </Button>

      <AdminDashboard open={showDashboard} onOpenChange={setShowDashboard} />
    </div>
  );
};

const AdminPasswordForm: React.FC<{
  onSubmit: () => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === 'password') {
      onSubmit();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="pr-10"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <Button type="submit" className="flex-1">
          Access Admin
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AdminButton;
