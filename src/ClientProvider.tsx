'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'

const ClientProvider = ({children}:{children: React.ReactNode}) => {
  return (
    <div>
      <SessionProvider refetchOnWindowFocus = {false}>
        {children}
      </SessionProvider>
    </div>
  )
}

export default ClientProvider
