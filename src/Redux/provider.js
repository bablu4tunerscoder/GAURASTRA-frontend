'use client'

import { Provider } from 'react-redux'
import { store } from './Store'
import DiscountPopup from '@/components/DiscountPopup'
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


export function Providers({ children }) {

  const pathname = usePathname();

  const isOfflineRoute = pathname.startsWith("/offline");


  return (
    <Provider store={store}>
      {!isOfflineRoute && <Header />}

      {!isOfflineRoute && <DiscountPopup />}
      {
        isOfflineRoute ?
          // offline
          <main>
            {children}
          </main> :
          // online
          <main>
            {children}
          </main>
      }


      {!isOfflineRoute && <Footer />}
      {/* <Footer /> */}

    </Provider>
  )
}
