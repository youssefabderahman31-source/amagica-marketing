import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { DataProvider } from './lib/data-context';
import { AuthProvider } from './lib/auth-context';
import { Toaster } from './components/ui/sonner';
import { Home } from './pages/Home';
import { Clients } from './pages/Clients';
import { Projects } from './pages/Projects';
import { Ideas } from './pages/Ideas';
import { Collaborators } from './pages/Collaborators';
import { Tasks } from './pages/Tasks';
import { CalendarPage } from './pages/CalendarPage';
import { Analytics } from './pages/Analytics';
import { CreativeHub } from './pages/CreativeHub';
import { Settings } from './pages/Settings';
import { DesignSystem } from './pages/DesignSystem';
import { Works } from './pages/Works';
import { ClientModal } from './components/modals/ClientModal';
import { ProjectModal } from './components/modals/ProjectModal';
import { IdeaModal } from './components/modals/IdeaModal';
import { CollaboratorModal } from './components/modals/CollaboratorModal';
import { TaskModal } from './components/modals/TaskModal';
import { EventModal } from './components/modals/EventModal';
import { AccessGate } from './components/AccessGate';

type Page = 'home' | 'clients' | 'projects' | 'ideas' | 'collaborators' | 'tasks' | 'calendar' | 'analytics' | 'creative-hub' | 'settings' | 'design-system' | 'works';


type QuickAddType = 'client' | 'project' | 'idea' | 'collaborator' | 'task' | 'event';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [quickAddModalType, setQuickAddModalType] = useState<QuickAddType | null>(null);

  // Effect for initial loading
  useEffect(() => {
    const init = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleQuickAdd = (type: QuickAddType) => {
    setQuickAddModalType(type);
  };

  const handleCloseQuickAdd = () => {
    setQuickAddModalType(null);
  };

  const handleSave = async (data: any) => {
    // TODO: Handle saving data based on the modal type
    handleCloseQuickAdd();
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} onQuickAdd={handleQuickAdd} />;
      case 'clients':
        return <Clients onNavigate={handleNavigate} />;
      case 'projects':
        return <Projects onNavigate={handleNavigate} />;
      case 'ideas':
        return <Ideas onNavigate={handleNavigate} />;
      case 'collaborators':
        return <Collaborators />;
      case 'tasks':
        return <Tasks />;
      case 'calendar':
        return <CalendarPage />;
      case 'analytics':
        return <Analytics />;
      case 'creative-hub':
        return <CreativeHub />;
      case 'works':
        return <Works />;
      case 'settings':
        return <Settings />;
      case 'design-system':
        return <DesignSystem />;
      default:
        return <Home onNavigate={handleNavigate} onQuickAdd={handleQuickAdd} />;
    }
  };

  const LoadingSpinner = () => (
    <div className="fixed inset-0 z-50 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="relative">
        <div className="animate-spin rounded-full h-32 w-32 border-4 border-purple-200"></div>
        <div className="animate-spin rounded-full h-32 w-32 border-4 border-purple-700 border-t-transparent absolute top-0"></div>
      </div>
    </div>
  );

  return (
    <AuthProvider>
      <DataProvider>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="min-h-screen flex flex-col bg-white">
            <Layout 
              currentPage={currentPage} 
              onNavigate={handleNavigate}
              onQuickAdd={handleQuickAdd}
            >
              <div className="flex-1">
                {renderPage()}
              </div>
            </Layout>
            <Toaster position="bottom-left" richColors />
            
            {/* Quick Add Modals */}
            {quickAddModalType === 'client' && (
              <ClientModal open={true} onClose={handleCloseQuickAdd} onSave={handleSave} />
            )}
            {quickAddModalType === 'project' && (
              <ProjectModal open={true} onClose={handleCloseQuickAdd} onSave={handleSave} />
            )}
            {quickAddModalType === 'idea' && (
              <IdeaModal open={true} onClose={handleCloseQuickAdd} onSave={handleSave} />
            )}
            {quickAddModalType === 'collaborator' && (
              <CollaboratorModal open={true} onClose={handleCloseQuickAdd} onSave={handleSave} />
            )}
            {quickAddModalType === 'task' && (
              <TaskModal open={true} onClose={handleCloseQuickAdd} onSave={handleSave} />
            )}
            {quickAddModalType === 'event' && (
              <EventModal open={true} onClose={handleCloseQuickAdd} onSave={handleSave} />
            )}
          </div>
        )}
      </DataProvider>
    </AuthProvider>
  );
}
