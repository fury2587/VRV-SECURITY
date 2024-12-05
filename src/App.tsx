import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';
import { Users } from '@/components/pages/users';
import { Roles } from '@/components/pages/roles';
import { Permissions } from '@/components/pages/permissions';
import { Dashboard } from '@/components/pages/dashboard';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background pattern */}
        <div className="fixed inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="fixed inset-0 bg-gradient-to-tr from-background to-background/50 -z-10" />
        
        <div className="flex min-h-screen">
          {/* Desktop sidebar */}
          <Sidebar className="hidden lg:block w-64 border-r" />
          
          {/* Mobile sidebar */}
          <Sidebar
            isMobile
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          
          <div className="flex-1">
            <Navbar onMenuClick={() => setSidebarOpen(true)} />
            <main className="p-6">
              <div className="container mx-auto space-y-6">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/roles" element={<Roles />} />
                  <Route path="/permissions" element={<Permissions />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;