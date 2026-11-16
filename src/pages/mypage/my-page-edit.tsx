import { useState } from "react";

const DEFAULT_PROFILE = {
    email: "test@example.com",
    nickname: "테스트유저",
};

type ProfileKey = keyof typeof DEFAULT_PROFILE;

export function MyPageEdit() {
    const [profile, setProfile] = useState(DEFAULT_PROFILE);

    const handleChangeField = (
        key: ProfileKey,
        value: string,
    ) => {
        setProfile((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <main>
            <h1>내 정보 수정</h1>

            <form>
                <div>
                    <label htmlFor="email">이메일</label>
                    <input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                            handleChangeField("email", e.target.value)
                        }
                    />
                </div>

                <div>
                    <label htmlFor="nickname">닉네임</label>
                    <input
                        id="nickname"
                        type="text"
                        value={profile.nickname}
                        onChange={(e) =>
                            handleChangeField("nickname", e.target.value)
                        }
                    />
                </div>

                <button type="button">
                    저장
                </button>
            </form>
        </main>
    );
}