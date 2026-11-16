import { useState } from "react";
import { checkEmail } from "../../api/members/check-email";
import { checkNickname } from "../../api/members/check-nickname";
import { signup } from "../../api/members/signup";

export function SignupPage() {
    const [form, setForm] = useState(DEFAULT_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [duplicateCheck, setDuplicateCheck] = useState({
        email: DEFAULT_DUPLICATE_CHECK,
        nickname: DEFAULT_DUPLICATE_CHECK,
    });

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

    const canSubmit =
        isFormValid &&
        duplicateCheck.email.isAvailable &&
        duplicateCheck.nickname.isAvailable;



    const handleChangeField = (
        key: DefaultFormKey,
        value: DefaultFormValue,
    ) => {
        if (key === "email" || key === "nickname") {
            if (duplicateCheck[key].isChecking) return;

            setDuplicateCheck((prev) => ({
                ...prev,
                [key]: DEFAULT_DUPLICATE_CHECK,
            }));
        }

        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };


    const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
        const isValid =
            key === "email" ? isEmailValid : isNicknameValid;

        if (!isValid || duplicateCheck[key].isChecking) return;

        const label = key === "email" ? "이메일" : "닉네임";

        setDuplicateCheck((prev) => ({
            ...prev,
            [key]: {
                isChecking: true,
                isAvailable: false,
            },
        }));

        try {
            const response =
                key === "email"
                    ? await checkEmail(form.email.trim())
                    : await checkNickname(form.nickname.trim());

            const isAvailable = response.available;

            setDuplicateCheck((prev) => ({
                ...prev,
                [key]: {
                    ...prev[key],
                    isAvailable,
                },
            }));

            alert(
                isAvailable
                    ? `사용할 수 있는 ${label}이에요.`
                    : `이미 사용 중인 ${label}이에요.`,
            );
        } catch {
            setDuplicateCheck((prev) => ({
                ...prev,
                [key]: {
                    ...prev[key],
                    isAvailable: false,
                },
            }));

            alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
        } finally {
            setDuplicateCheck((prev) => ({
                ...prev,
                [key]: {
                    ...prev[key],
                    isChecking: false,
                },
            }));
        }
    };

    const handleSubmit = async (
        e: React.SubmitEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        if (!canSubmit || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const response = await signup({
                email: form.email.trim(),
                nickname: form.nickname.trim(),
                password: form.password,
            });

            alert(response.message);
        } catch {
            alert("회원가입에 실패했어요. 다시 시도해 주세요.");
        } finally {
            setIsSubmitting(false);
        }
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
                        disabled={duplicateCheck.email.isChecking}
                    />

                    <button
                        type="button"
                        disabled={!isEmailValid || duplicateCheck.email.isChecking}
                        onClick={() => handleCheckDuplicate("email")}
                    >
                        {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
                    </button>

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
                        disabled={duplicateCheck.nickname.isChecking}
                    />

                    <button
                        type="button"
                        disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
                        onClick={() => handleCheckDuplicate("nickname")}
                    >
                        {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
                    </button>

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

                <button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                >
                    {isSubmitting ? "가입 중" : "가입하기"}
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

const DEFAULT_DUPLICATE_CHECK = {
    isChecking: false,
    isAvailable: false,
};

type DuplicateCheckKey = "email" | "nickname";

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];