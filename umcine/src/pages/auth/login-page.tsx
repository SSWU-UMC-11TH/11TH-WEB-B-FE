import { useState, type SubmitEvent } from "react";
import { LockIcon, MailIcon } from "../../components/icons";
import { useLoginMutation } from "../../hooks/use-login-mutation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inputClass =
  "h-12 w-full rounded-lg border border-[#e3e6eb] bg-white pl-9 pr-4 text-sm text-[#17191e] outline-none transition-colors placeholder:text-[#969da8] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLoginMutation();
  const canSubmit = EMAIL_REGEX.test(email.trim()) && password.length > 0;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || loginMutation.isPending) return;

    loginMutation.mutate({ email: email.trim(), password });
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16 md:py-24">
      <section className="w-full max-w-[430px]" aria-labelledby="login-title">
        <h1
          id="login-title"
          className="mb-6 text-[32px] font-bold leading-tight tracking-[-1.2px] text-[#17191e]"
        >
          로그인
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="login-email"
              className="mb-2 block text-sm font-bold text-[#17191e]"
            >
              이메일
            </label>
            <div className="relative">
              <MailIcon
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#606774]"
                width={16}
                height={16}
              />
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="username"
                placeholder="name@example.com"
                required
                className={inputClass}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="mb-2 block text-sm font-bold text-[#17191e]"
            >
              비밀번호
            </label>
            <div className="relative">
              <LockIcon
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#606774]"
                width={16}
                height={16}
              />
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="비밀번호"
                required
                className={inputClass}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit || loginMutation.isPending}
            className="h-12 w-full rounded-lg bg-[#2563eb] text-sm font-bold text-white transition-colors hover:enabled:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loginMutation.isPending ? "로그인 중" : "로그인"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[#606774]">
          처음이신가요?{" "}
          <a
            href="/signup"
            className="font-bold text-[#2563eb] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
          >
            회원가입
          </a>
        </p>
      </section>
    </main>
  );
}
