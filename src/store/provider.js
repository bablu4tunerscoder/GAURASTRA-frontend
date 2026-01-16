'use client'

import { Provider } from 'react-redux'
import { store } from './Store'
import DiscountPopup from '@/components/DiscountPopup'
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCartSync } from '@/hooks/useCartSync';
import CartFetcher from '@/components/CartFetcher'; // ✅ Optional: Auto-fetch cart

function ProvidersContent({ children }) {
  useCartSync(); // ✅ Sync local cart to API on login

  const pathname = usePathname();
  const isOfflineRoute = pathname.startsWith("/offline");

  return (
    <>
      <CartFetcher /> {/* ✅ Auto-fetch cart for logged-in users */}

      {!isOfflineRoute && <Header />}
      {!isOfflineRoute && <DiscountPopup />}

      {isOfflineRoute ? (
        <main>
          {children}
        </main>
      ) : (
        <main>
          {children}
        </main>
      )}

      {!isOfflineRoute && <Footer />}
    </>
  );
}

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ProvidersContent>
        {children}
      </ProvidersContent>
    </Provider>
  );
}