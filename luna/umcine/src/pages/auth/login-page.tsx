import React from 'react'
import { Link, useNavigate } from '@tanstack/react-router'

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6A2 2 0 0 0 13.4 13.4" />
      <path d="M9.88 5.35A10.94 10.94 0 0 1 12 5c6.5 0 10 7 10 7a17.52 17.52 0 0 1-4.07 5.26" />
      <path d="M6.61 6.61A17.57 17.57 0 0 0 2 12s3.5 7 10 7a10.3 10.3 0 0 0 5.4-1.61" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 118 0v3" />
    </svg>
  )
}

export default function LoginPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate({ to: '/mypage' })
  }

  return (
    <>
      <style>{`
        input[type='password']::-ms-reveal,
        input[type='password']::-ms-clear,
        input[type='password']::-webkit-credentials-auto-fill-button {
          display: none !important;
        }
      `}</style>

      <main className="account-page auth-page">
        <div className="auth-layout">
          <div className="auth-form">
            <h1 className="auth-title">로그인</h1>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="login-email" className="mb-2 block text-[14px] font-semibold text-[#111827]">
                  이메일
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#667085]">
                    <MailIcon />
                  </span>
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-12 w-full rounded-[10px] border border-[#dfe4ea] bg-[#f8fafc] pl-11 pr-3 text-[14px] text-[#111827] placeholder:text-[#98a2b3] outline-none transition focus:border-[#2563eb] focus:bg-white"
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="mb-2 block text-[14px] font-semibold text-[#111827]">
                  비밀번호
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#667085]">
                    <LockIcon />
                  </span>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-12 w-full rounded-[10px] border border-[#dfe4ea] bg-[#f8fafc] pl-11 pr-11 text-[14px] text-[#111827] placeholder:text-[#98a2b3] outline-none transition focus:border-[#2563eb] focus:bg-white"
                    placeholder="비밀번호"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
                    onClick={() => setShowPassword((current) => !current)}
                    className="password-toggle absolute inset-y-0 right-3 flex items-center justify-center rounded-md border-0 bg-transparent p-0 text-[#1f2937] outline-none transition hover:text-[#111827]"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="h-12 w-full rounded-[10px] bg-[#2563eb] text-[16px] font-semibold text-white transition hover:bg-[#1d4ed8]"
              >
                로그인
              </button>
            </form>

            <p className="mt-6 text-center text-[14px] text-[#6b7280]">
              처음이신가요?{' '}
              <Link to="/signup" className="font-semibold text-[#2563eb] underline decoration-[#2563eb] underline-offset-2">
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
