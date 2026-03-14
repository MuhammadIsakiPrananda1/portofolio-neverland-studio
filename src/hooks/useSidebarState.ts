import { useEffect, useState } from 'react';

interface SidebarState {
  isOpen: boolean;
}

/**
 * Custom hook to listen to mobile sidebar state changes
 */
export const useSidebarState = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleSidebarChange = (e: Event) => {
      const customEvent = e as CustomEvent<SidebarState>;
      setIsSidebarOpen(customEvent.detail.isOpen);
    };

    window.addEventListener('mobileSidebarChange', handleSidebarChange);
    
    return () => {
      window.removeEventListener('mobileSidebarChange', handleSidebarChange);
    };
  }, []);

  return isSidebarOpen;
};
