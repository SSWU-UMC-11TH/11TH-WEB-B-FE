import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { HTTPError, TimeoutError } from 'ky'
import { routeTree } from './routeTree.gen'
import './index.css'

const ONE_MINUTE = 60 * 1000
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_MINUTE,
      retry: (failureCount, error) => {
        if (error instanceof HTTPError) {
          const status = error.response.status

          if (status === 401 || status === 403 || status === 404 || status === 429) {
            return false
          }

          if (status >= 500) {
            return failureCount < 2
          }

          return false
        }

        if (error instanceof TimeoutError) {
          return failureCount < 2
        }

        if (error instanceof TypeError) {
          return failureCount < 2
        }

        return failureCount < 1
      },
    },
  },
})

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const container = document.getElementById('root')!
createRoot(container).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)
