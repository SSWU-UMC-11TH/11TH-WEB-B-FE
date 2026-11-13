import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useUserProfileStore } from '../../stores/user-profile-store'

export default function MyPageEditPage() {
  const navigate = useNavigate()
  const { nickname, email, setNickname } = useUserProfileStore()
  const [draftNickname, setDraftNickname] = React.useState(nickname)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNickname(draftNickname.trim() || nickname)
    navigate({ to: '/mypage' })
  }

  return (
    <main className="account-page profile-page profile-edit">
      <section className="profile-layout">
        <div className="profile-heading">
          <h1 className="text-[40px] font-bold tracking-[-0.03em] text-[#111827]">내 정보 수정</h1>
          <button
            type="submit"
            form="profile-form"
            className="inline-flex h-11 items-center justify-center rounded-[10px] bg-[#2563eb] px-5 text-[14px] font-semibold text-white transition hover:bg-[#1d4ed8]"
          >
            변경사항 저장
          </button>
        </div>

        <div className="pt-8">
          <p className="mb-7 text-[16px] text-[#6b7280]">닉네임과 프로필 이미지만 변경할 수 있어요.</p>

          <form id="profile-form" className="flex flex-col gap-8" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <div className="flex w-full max-w-[220px] flex-col items-center justify-center pt-2">
                <div className="relative">
                  <div className="flex size-[100px] items-center justify-center rounded-full bg-[#dfe4ea] text-[36px] font-bold text-[#374151]">
                    <img src="/icons/person.svg" alt="" className="profile-person" />
                  </div>
                  <button
                    type="button"
                    className="absolute -bottom-1 right-0 flex size-8 items-center justify-center rounded-full border border-[#dfe4ea] bg-white text-[#111827] shadow-sm"
                    aria-label="프로필 이미지 변경"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.1 2.1 0 113 3L7 19l-4 1 1-4 12.5-12.5Z" />
                    </svg>
                  </button>
                </div>
                <p className="profile-image-label">프로필 이미지</p><p className="profile-image-help">선택 사항 · 최대 5MB</p>
              </div>

              <div className="flex-1 max-w-[560px] space-y-5">
                <div>
                  <label htmlFor="edit-nickname" className="mb-2 block text-[14px] font-semibold text-[#111827]">
                    닉네임
                  </label>
                  <div className="duplicate-field">
                    <input
                      id="edit-nickname"
                      type="text"
                      value={draftNickname}
                      onChange={(event) => setDraftNickname(event.target.value)}
                      className="h-12 flex-1 rounded-[10px] border border-[#dfe4ea] bg-[#f8fafc] px-3 text-[14px] text-[#111827] outline-none transition focus:border-[#2563eb] focus:bg-white"
                      placeholder="새 닉네임을 입력해주세요"
                    />
                    <button
                      type="button"
                      className="h-12 shrink-0 rounded-[10px] bg-[#1f2937] px-4 text-[14px] font-semibold text-white transition hover:bg-[#111827]"
                    >
                      중복 확인
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="edit-email" className="mb-2 block text-[14px] font-semibold text-[#111827]">
                    이메일
                  </label>
                  <input
                    id="edit-email"
                    value={email}
                    readOnly
                    className="h-12 w-full rounded-[10px] border border-[#dfe4ea] bg-[#f1f5f9] px-3 text-[14px] text-[#6b7280] outline-none"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-16 rounded-[12px] border border-[#fca5a5] bg-[#fff1f2] px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[16px] font-semibold text-[#b91c1c]">회원 탈퇴</p>
              <p className="mt-1 text-[13px] text-[#991b1b]">탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.</p>
            </div>
            <button
              type="button"
              className="h-11 rounded-[10px] border border-[#ef4444] bg-white px-4 text-[14px] font-semibold text-[#ef4444] transition hover:bg-[#fef2f2]"
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
