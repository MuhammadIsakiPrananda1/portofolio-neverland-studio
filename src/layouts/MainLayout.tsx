import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@components/organisms/Navbar';
import Footer from '@components/organisms/Footer';
import FloatingButtons from '@components/organisms/FloatingButtons';

// Lazy-load non-critical UI so they don't block initial paint
const AILiveChat = lazy(() => import('@components/organisms/AILiveChat'));
const CartDrawer = lazy(() => import('@components/organisms/CartDrawer/CartDrawer'));
const FloatingCartButton = lazy(() => import('@components/organisms/FloatingCartButton'));

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen lg:ml-[280px]">
        <Outlet />
      </main>
      <footer className="lg:ml-[280px]">
        <Footer />
      </footer>
      <FloatingButtons />
      <Suspense fallback={null}>
        <AILiveChat />
        <CartDrawer />
        <FloatingCartButton />
      </Suspense>
    </>
  );
}
