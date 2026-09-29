import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '../components/layout/header'
import Footer from '../components/layout/footer'

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col bg-[#f6f7f9] font-umcine leading-[normal] text-[#111] [&>main]:flex-1">
      <Header />
      <Outlet />
      <Footer />
    </div>
  ),
  notFoundComponent: () => <main className="mx-auto w-full max-w-[1200px] px-5 py-7">페이지를 찾을 수 없어요.</main>,
})
