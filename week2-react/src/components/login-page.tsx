import { useState } from "react";
import "./login-page.css";

interface LoginPageProps {
  onSignUp: () => void;
}

export default function LoginPage({ onSignUp }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // TODO: 실제 로그인 API 연동은 이후 주차에서 이어가요.
    console.log("로그인 시도:", { email, password });
  }

  return (
    <section className="login-page">
      <form id="login-form" className="login-page__box" onSubmit={handleSubmit}>
        <h1 className="login-page__title">로그인</h1>

        <div className="login-page__field">
          <label className="login-page__label" htmlFor="email">
            이메일
          </label>
          <div className="login-page__input-wrap">
            <svg
              className="login-page__input-icon"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="m4 6.5 8 6.2 8-6.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              id="email"
              className="login-page__input"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>

        <div className="login-page__field">
          <label className="login-page__label" htmlFor="password">
            비밀번호
          </label>
          <div className="login-page__input-wrap">
            <svg
              className="login-page__input-icon"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <rect
                x="5"
                y="10.5"
                width="14"
                height="9.5"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M8 10.5V7.5a4 4 0 0 1 8 0v3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <input
              id="password"
              className="login-page__input"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="login-page__submit">
          로그인
        </button>

        <p className="login-page__signup">
          처음이신가요?{" "}
          <button type="button" className="login-page__signup-link" onClick={onSignUp}>
            회원가입
          </button>
        </p>
      </form>
    </section>
  );
}
