import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Palette, Crown } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="fixed top-20 right-4 z-[10001] bg-background/95 backdrop-blur-sm border-2 hover:bg-muted transition-all duration-300 hover-showcase shadow-lg"
      title={`Switch to ${theme === 'premium' ? 'simple' : 'premium'} theme`}
    >
      <div className="flex items-center gap-2">
        {theme === 'premium' ? (
          <>
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Simple</span>
          </>
        ) : (
          <>
            <Crown className="h-4 w-4" />
            <span className="hidden sm:inline">Premium</span>
          </>
        )}
      </div>
    </Button>
  );
};

export default ThemeToggle;
