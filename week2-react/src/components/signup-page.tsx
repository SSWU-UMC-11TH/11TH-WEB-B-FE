import { useState } from "react";
import "./signup-page.css";

interface SignupPageProps {
  onLogin: () => void;
}

export default function SignupPage({ onLogin }: SignupPageProps) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // TODO: 실제 회원가입 API 연동은 이후 주차에서 이어가요.
    console.log("회원가입 시도:", { email, nickname, password, passwordConfirm });
  }

  function handleCheckEmail() {
    // TODO: 이메일 중복 확인 API 연동은 이후 주차에서 이어가요.
    console.log("이메일 중복 확인:", email);
  }

  function handleCheckNickname() {
    // TODO: 닉네임 중복 확인 API 연동은 이후 주차에서 이어가요.
    console.log("닉네임 중복 확인:", nickname);
  }

  return (
    <section className="signup-page">
      <form id="signup-form" className="signup-page__box" onSubmit={handleSubmit}>
        <h1 className="signup-page__title">회원가입</h1>

        <div className="signup-page__field">
          <label className="signup-page__label" htmlFor="signup-email">
            이메일
          </label>
          <div className="signup-page__input-wrap">
            <input
              id="signup-email"
              className="signup-page__input"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button
              type="button"
              className="signup-page__check-button"
              onClick={handleCheckEmail}
            >
              중복 확인
            </button>
          </div>
        </div>

        <div className="signup-page__field">
          <label className="signup-page__label" htmlFor="signup-nickname">
            닉네임
          </label>
          <div className="signup-page__input-wrap">
            <input
              id="signup-nickname"
              className="signup-page__input"
              type="text"
              placeholder="2-12자"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
            />
            <button
              type="button"
              className="signup-page__check-button"
              onClick={handleCheckNickname}
            >
              중복 확인
            </button>
          </div>
        </div>

        <div className="signup-page__field">
          <label className="signup-page__label" htmlFor="signup-password">
            비밀번호
          </label>
          <div className="signup-page__input-wrap">
            <input
              id="signup-password"
              className="signup-page__input"
              type="password"
              placeholder="8자 이상"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <p className="signup-page__helper">
            영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요
          </p>
        </div>

        <div className="signup-page__field">
          <label className="signup-page__label" htmlFor="signup-password-confirm">
            비밀번호 확인
          </label>
          <div className="signup-page__input-wrap">
            <input
              id="signup-password-confirm"
              className="signup-page__input"
              type="password"
              placeholder="다시 입력"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="signup-page__submit">
          가입하기
        </button>

        <p className="signup-page__login">
          이미 계정이 있나요?{" "}
          <button type="button" className="signup-page__login-link" onClick={onLogin}>
            로그인
          </button>
        </p>
      </form>
    </section>
  );
}
