import { createFileRoute } from "@tanstack/react-router";
import { MyPage } from "../../pages/member/my-page";

export const Route = createFileRoute("/(protected)/mypage")({
  component: MyPage,
});
