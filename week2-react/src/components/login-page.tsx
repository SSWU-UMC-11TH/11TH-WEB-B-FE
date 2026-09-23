import { useState } from "react";
import { MailIcon, LockIcon } from "./icons";
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
    console.log("로그인 시도");
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
            <MailIcon className="login-page__input-icon" width={16} height={16} />
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
            <LockIcon className="login-page__input-icon" width={16} height={16} />
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
