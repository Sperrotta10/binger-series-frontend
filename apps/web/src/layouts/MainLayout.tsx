import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { QuickLogProvider } from '../components/modals/QuickLogContext';
import { QuickLogModal } from '../components/modals/QuickLogModal';
import { MobileNavProvider } from '../contexts/MobileNavProvider';
import { useMobileNav } from '../contexts/useMobileNav';

function LayoutShell() {
  const { isOpen, close } = useMobileNav();

  return (
    <div className="font-body-md text-on-surface bg-[#121317] min-h-screen flex">
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={close}
        />
      )}
      <Sidebar />
      <Topbar />
      <main className="ml-0 lg:ml-64 mt-16 w-full min-h-[calc(100vh-64px)] grid grid-cols-12 gap-gutter px-4 sm:px-margin-desktop py-md sm:py-xl relative z-10">
        <Outlet />
      </main>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30 transform -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary-fixed/10 rounded-full blur-[150px] opacity-20 transform translate-y-1/4" />
      </div>
      <QuickLogModal />
    </div>
  );
}

export const MainLayout = () => {
  return (
    <QuickLogProvider>
      <MobileNavProvider>
        <LayoutShell />
      </MobileNavProvider>
    </QuickLogProvider>
  );
};
