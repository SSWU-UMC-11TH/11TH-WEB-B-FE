import { createFileRoute } from '@tanstack/react-router'
import MyPageEditPage from '../pages/mypage/mypage-edit-page'

export const Route = createFileRoute('/mypage/edit')({
  component: MyPageEditPage,
})
