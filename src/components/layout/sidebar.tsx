import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SIDEBAR_LINKS } from '@/lib/constants';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Sparkles, ChevronLeft } from 'lucide-react';

interface SidebarProps {
  className?: string;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ className, isMobile, isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarContent = (
    <div 
      className={cn(
        'pb-12 min-h-screen relative transition-all duration-300 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className={cn(
            "mb-4 flex items-center space-x-2 px-4 transition-all duration-300 cursor-pointer",
            isCollapsed && "justify-center px-0"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <Sparkles className={cn(
              "h-6 w-6 text-primary transition-all duration-300",
              isCollapsed ? "w-8 h-8 animate-pulse" : "w-6 h-6"
            )} />
            {!isCollapsed && <h2 className="text-lg font-bold">Admin Dashboard</h2>}
          </div>
          <ScrollArea className="h-[calc(100vh-6rem)]">
            <div className="space-y-1">
              {SIDEBAR_LINKS.map((link) => (
                <Button
                  key={link.href}
                  variant={location.pathname === link.href ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full group relative overflow-hidden transition-all duration-300',
                    isCollapsed ? 'justify-center px-2' : 'justify-start px-4 gap-2',
                    location.pathname === link.href && 'bg-primary/10'
                  )}
                  onClick={() => {
                    navigate(link.href);
                    if (onClose) onClose();
                  }}
                >
                  <link.icon className={cn(
                    "transition-all duration-300",
                    isCollapsed ? "h-5 w-5" : "h-4 w-4"
                  )} />
                  {!isCollapsed && <span>{link.title}</span>}
                  <div className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute -right-4 top-6 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-transparent",
          !isMobile && "lg:opacity-100"
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronLeft className={cn(
          "h-5 w-5 transition-transform duration-300",
          isCollapsed && "rotate-180"
        )} />
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-0 w-72">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    );
  }

  return sidebarContent;
}