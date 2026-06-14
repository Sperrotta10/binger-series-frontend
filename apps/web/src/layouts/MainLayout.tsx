import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { QuickLogProvider } from '../components/modals/QuickLogContext';
import { QuickLogModal } from '../components/modals/QuickLogModal';

export const MainLayout = () => {
  return (
    <QuickLogProvider>
      <div className="font-body-md text-on-surface bg-[#121317] min-h-screen flex">
        <Sidebar />
        <Topbar />
        <main className="ml-64 mt-16 w-full min-h-[calc(100vh-64px)] grid grid-cols-12 gap-gutter px-margin-desktop py-xl relative z-10">
          <Outlet />
        </main>
        {/* Atmospheric Background Shader - Midnight Kinetic */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30 transform -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary-fixed/10 rounded-full blur-[150px] opacity-20 transform translate-y-1/4"></div>
        </div>
        <QuickLogModal />
      </div>
    </QuickLogProvider>
  );
};
