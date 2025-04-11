
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { SidebarProvider } from '@/components/ui/sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const MainLayout = ({ children, showFooter = true }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        {showFooter && <Footer />}
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
