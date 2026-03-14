import { Outlet } from 'react-router-dom';
import Navbar from '@components/organisms/Navbar';
import Footer from '@components/organisms/Footer';
import FloatingButtons from '@components/organisms/FloatingButtons';
import AILiveChat from '@components/organisms/AILiveChat';
import CartDrawer from '@components/organisms/CartDrawer/CartDrawer';
import FloatingCartButton from '@components/organisms/FloatingCartButton';

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
      <AILiveChat />
      <CartDrawer />
      <FloatingCartButton />
    </>
  );
}
