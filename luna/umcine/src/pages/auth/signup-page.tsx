import React from 'react'
import { Link } from '@tanstack/react-router'
import { HTTPError } from 'ky'
import { checkEmailDuplicate } from '../../api/members/check-email-duplicate'
import { checkNicknameDuplicate } from '../../api/members/check-nickname-duplicate'
import { signupMember } from '../../api/members/signup'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/

interface SignupFormState {
  email: string
  nickname: string
  password: string
  passwordConfirm: string
}

const initialForm: SignupFormState = {
  email: '',
  nickname: '',
  password: '',
  passwordConfirm: '',
}

function normalizeNickname(value: string) {
  return value.replace(/\s+/g, '')
}

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

async function getApiErrorMessage(error: unknown) {
  if (error instanceof HTTPError) {
    try {
      const payload = (await error.response.clone().json()) as { message?: string; error?: string }
      return payload.message || payload.error || '요청 처리 중 오류가 발생했습니다.'
    } catch {
      return error.message
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return '요청 처리 중 오류가 발생했습니다.'
}

export default function SignupPage() {
  const [form, setForm] = React.useState<SignupFormState>(initialForm)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false)
  const [isCheckingEmail, setIsCheckingEmail] = React.useState(false)
  const [isCheckingNickname, setIsCheckingNickname] = React.useState(false)
  const [emailDuplicateCheck, setEmailDuplicateCheck] = React.useState<boolean | null>(null)
  const [nicknameDuplicateCheck, setNicknameDuplicateCheck] = React.useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitMessage, setSubmitMessage] = React.useState('')
  const [submitError, setSubmitError] = React.useState('')

  const emailValidationError = React.useMemo(() => {
    if (!form.email.trim()) return '이메일을 입력해 주세요.'
    return EMAIL_REGEX.test(form.email.trim()) ? '' : '올바른 이메일 형식이 아닙니다.'
  }, [form.email])

  const normalizedNickname = React.useMemo(() => normalizeNickname(form.nickname), [form.nickname])
  const nicknameValidationError = React.useMemo(() => {
    if (!form.nickname.trim()) return '닉네임을 입력해 주세요.'
    return normalizedNickname.length >= 2 && normalizedNickname.length <= 12 ? '' : '닉네임은 공백 제외 2~12자여야 합니다.'
  }, [form.nickname, normalizedNickname])

  const passwordValidationError = React.useMemo(() => {
    if (!form.password) return '비밀번호를 입력해 주세요.'
    return PASSWORD_REGEX.test(form.password) ? '' : '비밀번호는 8자 이상이며 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.'
  }, [form.password])

  const passwordConfirmValidationError = React.useMemo(() => {
    if (!form.passwordConfirm) return '비밀번호 확인을 입력해 주세요.'
    return form.password === form.passwordConfirm ? '' : '비밀번호가 일치하지 않습니다.'
  }, [form.password, form.passwordConfirm])

  const isEmailAvailable = emailValidationError === '' && emailDuplicateCheck === true
  const isNicknameAvailable = nicknameValidationError === '' && nicknameDuplicateCheck === true
  const canSubmit =
    !isSubmitting &&
    !isCheckingEmail &&
    !isCheckingNickname &&
    emailValidationError === '' &&
    nicknameValidationError === '' &&
    passwordValidationError === '' &&
    passwordConfirmValidationError === '' &&
    isEmailAvailable &&
    isNicknameAvailable

  const handleFieldChange = (field: keyof SignupFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setSubmitMessage('')
    setSubmitError('')

    if (field === 'email') {
      setEmailDuplicateCheck(null)
    }

    if (field === 'nickname') {
      setNicknameDuplicateCheck(null)
    }
  }

  const handleCheckEmailDuplicate = async () => {
    const trimmedEmail = form.email.trim()

    if (!trimmedEmail || emailValidationError) {
      setEmailDuplicateCheck(null)
      setSubmitError('')
      return
    }

    setIsCheckingEmail(true)
    setSubmitError('')

    try {
      const response = await checkEmailDuplicate(trimmedEmail)
      setEmailDuplicateCheck(response.available)
    } catch (error) {
      const message = await getApiErrorMessage(error)
      setEmailDuplicateCheck(false)
      setSubmitError(message)
    } finally {
      setIsCheckingEmail(false)
    }
  }

  const handleCheckNicknameDuplicate = async () => {
    const normalizedValue = normalizeNickname(form.nickname)

    if (!normalizedValue || nicknameValidationError) {
      setNicknameDuplicateCheck(null)
      setSubmitError('')
      return
    }

    setIsCheckingNickname(true)
    setSubmitError('')

    try {
      const response = await checkNicknameDuplicate(normalizedValue)
      setNicknameDuplicateCheck(response.available)
    } catch (error) {
      const message = await getApiErrorMessage(error)
      setNicknameDuplicateCheck(false)
      setSubmitError(message)
    } finally {
      setIsCheckingNickname(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSubmit) {
      return
    }

    setIsSubmitting(true)
    setSubmitError('')
    setSubmitMessage('')

    try {
      const response = await signupMember({
        email: form.email.trim(),
        nickname: normalizeNickname(form.nickname),
        password: form.password,
      })

      setSubmitMessage(response.message)
      setForm(initialForm)
      setEmailDuplicateCheck(null)
      setNicknameDuplicateCheck(null)
    } catch (error) {
      const message = await getApiErrorMessage(error)
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
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
            <h1 className="auth-title">회원가입</h1>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="email" className="mb-2 block text-[14px] font-semibold text-[#111827]">
                  이메일
                </label>
                <div className="duplicate-field">
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => handleFieldChange('email', event.target.value)}
                    disabled={isCheckingEmail}
                    className="h-12 flex-1 rounded-[10px] border border-[#dfe4ea] bg-[#f8fafc] px-3 text-[14px] text-[#111827] placeholder:text-[#98a2b3] outline-none transition focus:border-[#2563eb] focus:bg-white disabled:cursor-not-allowed disabled:bg-[#eef2f6]"
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                  <button
                    type="button"
                    onClick={handleCheckEmailDuplicate}
                    disabled={isCheckingEmail || !!emailValidationError || !form.email.trim()}
                    className="h-12 shrink-0 rounded-[10px] bg-[#1f2937] px-4 text-[14px] font-semibold text-white transition hover:bg-[#111827] disabled:cursor-not-allowed disabled:bg-[#d1d5db]"
                  >
                    {isCheckingEmail ? '확인 중' : '중복 확인'}
                  </button>
                </div>
                {form.email && emailValidationError && <p className="mt-2 text-sm text-[#ef4444]">{emailValidationError}</p>}
                {!emailValidationError && emailDuplicateCheck === false && (
                  <p className="mt-2 text-sm text-[#ef4444]">이미 사용 중인 이메일입니다.</p>
                )}
                {!emailValidationError && emailDuplicateCheck === true && (
                  <p className="mt-2 text-sm text-[#16a34a]">사용 가능한 이메일입니다.</p>
                )}
              </div>

              <div>
                <label htmlFor="nickname" className="mb-2 block text-[14px] font-semibold text-[#111827]">
                  닉네임
                </label>
                <div className="duplicate-field">
                  <input
                    id="nickname"
                    type="text"
                    value={form.nickname}
                    onChange={(event) => handleFieldChange('nickname', event.target.value)}
                    disabled={isCheckingNickname}
                    className="h-12 flex-1 rounded-[10px] border border-[#dfe4ea] bg-[#f8fafc] px-3 text-[14px] text-[#111827] placeholder:text-[#98a2b3] outline-none transition focus:border-[#2563eb] focus:bg-white disabled:cursor-not-allowed disabled:bg-[#eef2f6]"
                    placeholder="2–12자"
                    autoComplete="nickname"
                  />
                  <button
                    type="button"
                    onClick={handleCheckNicknameDuplicate}
                    disabled={isCheckingNickname || !!nicknameValidationError || !form.nickname.trim()}
                    className="h-12 shrink-0 rounded-[10px] bg-[#1f2937] px-4 text-[14px] font-semibold text-white transition hover:bg-[#111827] disabled:cursor-not-allowed disabled:bg-[#d1d5db]"
                  >
                    {isCheckingNickname ? '확인 중' : '중복 확인'}
                  </button>
                </div>
                {form.nickname && nicknameValidationError && <p className="mt-2 text-sm text-[#ef4444]">{nicknameValidationError}</p>}
                {!nicknameValidationError && nicknameDuplicateCheck === false && (
                  <p className="mt-2 text-sm text-[#ef4444]">이미 사용 중인 닉네임입니다.</p>
                )}
                {!nicknameValidationError && nicknameDuplicateCheck === true && (
                  <p className="mt-2 text-sm text-[#16a34a]">사용 가능한 닉네임입니다.</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-[14px] font-semibold text-[#111827]">
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(event) => handleFieldChange('password', event.target.value)}
                    className="h-12 w-full rounded-[10px] border border-[#dfe4ea] bg-[#f8fafc] px-3 pr-11 text-[14px] text-[#111827] placeholder:text-[#98a2b3] outline-none transition focus:border-[#2563eb] focus:bg-white"
                    placeholder="8자 이상"
                    autoComplete="new-password"
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
                <div className="mt-2 text-[12px] leading-5 text-[#667085]">
                  <p>영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요</p>
                </div>
                {form.password && passwordValidationError && <p className="mt-2 text-sm text-[#ef4444]">{passwordValidationError}</p>}
              </div>

              <div>
                <label htmlFor="passwordConfirm" className="mb-2 block text-[14px] font-semibold text-[#111827]">
                  비밀번호 확인
                </label>
                <div className="relative">
                  <input
                    id="passwordConfirm"
                    type={showPasswordConfirm ? 'text' : 'password'}
                    value={form.passwordConfirm}
                    onChange={(event) => handleFieldChange('passwordConfirm', event.target.value)}
                    className="h-12 w-full rounded-[10px] border border-[#dfe4ea] bg-[#f8fafc] px-3 pr-11 text-[14px] text-[#111827] placeholder:text-[#98a2b3] outline-none transition focus:border-[#2563eb] focus:bg-white"
                    placeholder="다시 입력"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    aria-label={showPasswordConfirm ? '비밀번호 확인 숨기기' : '비밀번호 확인 표시'}
                    onClick={() => setShowPasswordConfirm((current) => !current)}
                    className="password-toggle absolute inset-y-0 right-3 flex items-center justify-center rounded-md border-0 bg-transparent p-0 text-[#1f2937] outline-none transition hover:text-[#111827]"
                  >
                    {showPasswordConfirm ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {form.passwordConfirm && passwordConfirmValidationError && <p className="mt-2 text-sm text-[#ef4444]">{passwordConfirmValidationError}</p>}
              </div>

              {submitError && <p className="rounded-[10px] bg-[#fef2f2] px-3 py-2 text-sm text-[#b91c1c]">{submitError}</p>}
              {submitMessage && <p className="rounded-[10px] bg-[#ecfdf5] px-3 py-2 text-sm text-[#166534]">{submitMessage}</p>}

              <button
                type="submit"
                disabled={!canSubmit}
                className="h-12 w-full rounded-[10px] bg-[#2563eb] text-[16px] font-semibold text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:bg-[#93c5fd]"
              >
                {isSubmitting ? '가입 중' : '가입하기'}
              </button>
            </form>

            <p className="mt-6 text-center text-[14px] text-[#6b7280]">
              이미 계정이 있나요?{' '}
              <Link to="/login" className="font-semibold text-[#2563eb] underline decoration-[#2563eb] underline-offset-2">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
