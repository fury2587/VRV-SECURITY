import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { SIDEBAR_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Get current path to determine which search to trigger
    const path = location.pathname;
    
    // Store search query in sessionStorage for the respective pages to use
    sessionStorage.setItem('globalSearchQuery', query);
    
    // Navigate to the appropriate section based on the search
    if (path === '/') {
      navigate('/users');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="hidden lg:flex">
          {SIDEBAR_LINKS.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              className={cn(
                'mx-1',
                location.pathname === link.href && 'bg-muted'
              )}
              onClick={() => navigate(link.href)}
            >
              <link.icon className="h-4 w-4 mr-2" />
              {link.title}
            </Button>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className={cn(
            'transition-all duration-300 ease-in-out relative',
            searchOpen ? 'w-64' : 'w-9'
          )}>
            <Search 
              className="h-4 w-4 absolute left-2 top-2.5 text-muted-foreground cursor-pointer"
              onClick={() => setSearchOpen(!searchOpen)}
            />
            <Input
              placeholder="Search..."
              className={cn(
                'pl-8 transition-all duration-300',
                !searchOpen && 'opacity-0'
              )}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={(e) => {
                if (!e.target.value) {
                  setSearchOpen(false);
                }
              }}
            />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}