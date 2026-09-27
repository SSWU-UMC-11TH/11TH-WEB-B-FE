import React, { useState } from 'react'

interface Props {
  onLogin: (u: { email: string; nickname: string }) => void
  onSignup: () => void
}

export default function LoginPage({ onLogin, onSignup }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    onLogin({ email, nickname: email.split('@')[0] })
  }

  return (
    <section className="auth container">
      <form className="auth-form" onSubmit={submit}>
        <h2>로그인</h2>
        <label>
          이메일
          <div className="input-icon">
            <img src="/icons/mail.svg" alt="mail" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
          </div>
        </label>

        <label>
          비밀번호
          <div className="input-icon">
            <img src="/icons/lock.svg" alt="lock" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
          </div>
        </label>

        <button className="primary" type="submit">로그인</button>

        <div className="auth-footer">
          처음이신가요? <button type="button" className="link-btn" onClick={onSignup}>회원가입</button>
        </div>
      </form>
    </section>
  )
}
