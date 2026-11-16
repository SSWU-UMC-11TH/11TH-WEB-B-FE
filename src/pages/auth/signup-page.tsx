import { useState } from "react";

export function SignupPage() {
    const [form, setForm] = useState(DEFAULT_FORM);

    const isEmailValid = EMAIL_REGEX.test(form.email.trim());

    const isNicknameValid =
        form.nickname.trim().length >= 2 &&
        form.nickname.trim().length <= 12;

    const isPasswordValid = PASSWORD_REGEX.test(form.password);

    const isPasswordConfirmValid =
        form.passwordConfirm.length > 0 &&
        form.password === form.passwordConfirm;

    const showEmailError =
        form.email.length > 0 && !isEmailValid;

    const showNicknameError =
        form.nickname.length > 0 && !isNicknameValid;

    const showPasswordError =
        form.password.length > 0 && !isPasswordValid;

    const showPasswordConfirmError =
        form.passwordConfirm.length > 0 &&
        !isPasswordConfirmValid;


    const isFormValid =
        isEmailValid &&
        isNicknameValid &&
        isPasswordValid &&
        isPasswordConfirmValid;

    const handleChangeField = (
        key: DefaultFormKey,
        value: DefaultFormValue,
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <main>
            <h1>회원가입</h1>

            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label htmlFor="email">이메일</label>
                    <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChangeField("email", e.target.value)}
                        placeholder="이메일을 입력해 주세요."
                    />

                    {showEmailError && (
                        <p>올바른 이메일 형식을 입력해 주세요.</p>
                    )}
                </div>

                <div>
                    <label htmlFor="nickname">닉네임</label>
                    <input
                        id="nickname"
                        type="text"
                        value={form.nickname}
                        onChange={(e) => handleChangeField("nickname", e.target.value)}
                        placeholder="닉네임을 입력해 주세요."
                    />

                    {showNicknameError && (
                        <p>닉네임은 2자 이상 12자 이하로 입력해 주세요.</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        value={form.password}
                        onChange={(e) => handleChangeField("password", e.target.value)}
                        placeholder="비밀번호를 입력해 주세요."
                    />

                    {showPasswordError && (
                        <p>
                            비밀번호는 영문 대소문자, 숫자, 특수문자를 포함해
                            8자 이상 입력해 주세요.
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="passwordConfirm">비밀번호 확인</label>
                    <input
                        id="passwordConfirm"
                        type="password"
                        value={form.passwordConfirm}
                        onChange={(e) =>
                            handleChangeField("passwordConfirm", e.target.value)
                        }
                        placeholder="비밀번호를 다시 입력해 주세요."
                    />

                    {showPasswordConfirmError && (
                        <p>비밀번호가 일치하지 않습니다.</p>
                    )}
                </div>

                <button type="submit" disabled={!isFormValid}>
                    가입하기
                </button>
            </form>
        </main>
    );
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];