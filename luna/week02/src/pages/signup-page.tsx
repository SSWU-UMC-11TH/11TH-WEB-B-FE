import React, { useState } from 'react'

interface Props {
  onLogin: () => void
}

export default function SignupPage({ onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    onLogin()
  }

  return (
    <section className="auth container signup">
      <form className="auth-form" onSubmit={submit}>
        <h2>회원가입</h2>

        <label>
          이메일
          <div className="input-with-btn">
            <input placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="button" className="small">중복 확인</button>
          </div>
        </label>

        <label>
          닉네임
          <div className="input-with-btn">
            <input placeholder="2~12자" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <button type="button" className="small">중복 확인</button>
          </div>
        </label>

        <label>
          비밀번호
          <input placeholder="8자 이상" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <small className="password-help">영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요</small>
        </label>

        <label>
          비밀번호 확인
          <input placeholder="다시 입력" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </label>

        <button className="primary" type="submit">가입하기</button>

        <div className="auth-footer">
          이미 계정이 있나요? <button type="button" className="link-btn" onClick={onLogin}>로그인</button>
        </div>
      </form>
    </section>
  )
}
