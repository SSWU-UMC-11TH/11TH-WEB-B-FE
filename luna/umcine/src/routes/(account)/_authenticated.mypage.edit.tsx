import { createFileRoute } from '@tanstack/react-router'
import MyPageEditPage from '../../pages/mypage/mypage-edit-page'

export const Route = createFileRoute('/(account)/_authenticated/mypage/edit')({
  component: MyPageEditPage,
})
