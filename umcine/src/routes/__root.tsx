import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <Header />
      <Outlet />
    </div>
  ),
  notFoundComponent: () => (
    <main className="mx-auto w-full max-w-[1440px] px-6 py-20 text-center text-[#606774] md:px-20">
      페이지를 찾을 수 없어요.
    </main>
  ),
});