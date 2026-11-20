import { createFileRoute, Navigate, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store";

// (protected) 폴더는 URL에 나타나지 않고, 로그인 후에만 접근할 페이지를 묶어요.
// 이 route.tsx가 폴더 안 페이지들의 공통 Layout Route가 돼요.
export const Route = createFileRoute("/(protected)")({
  beforeLoad: () => {
    if (!useAuthStore.getState().accessToken) {
      alert("로그인이 필요한 페이지예요.");
      throw redirect({ to: "/login" });
    }
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  const accessToken = useAuthStore((state) => state.accessToken);

  // 페이지를 보는 중에 401로 토큰이 비워지면 로그인 페이지로 보내요.
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
