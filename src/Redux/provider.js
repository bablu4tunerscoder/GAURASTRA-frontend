'use client'

import { Provider } from 'react-redux'
import { store } from './Store'
import DiscountPopup from '@/components/DiscountPopup'
import { usePathname } from 'next/navigation';


export function Providers({ children }) {

const pathname = usePathname();

  const isOfflineRoute = pathname.startsWith("/offline");  


  return (
    <Provider store={store}>
      {!isOfflineRoute && <DiscountPopup />}
      {children}

    </Provider>
  )
}
