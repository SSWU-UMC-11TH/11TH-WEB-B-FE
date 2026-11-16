import { useState } from "react";

const DEFAULT_LOGIN_FORM = {
    email: "",
    password: "",
};

type LoginFormKey = keyof typeof DEFAULT_LOGIN_FORM;

export function LoginPage() {
    const [form, setForm] = useState(DEFAULT_LOGIN_FORM);

    const handleChangeField = (
        key: LoginFormKey,
        value: string,
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <main>
            <h1>로그인</h1>

            <form>
                <div>
                    <label htmlFor="email">이메일</label>
                    <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                            handleChangeField("email", e.target.value)
                        }
                        placeholder="이메일을 입력해 주세요."
                    />
                </div>

                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        value={form.password}
                        onChange={(e) =>
                            handleChangeField("password", e.target.value)
                        }
                        placeholder="비밀번호를 입력해 주세요."
                    />
                </div>

                <button type="button">
                    로그인
                </button>
            </form>
        </main>
    );
}