import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4 justify-between">
        <div className="font-semibold">Admin Portal</div>
        <Button variant="ghost" size="icon">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}