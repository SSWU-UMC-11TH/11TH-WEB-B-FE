const MY_INFO = {
    memberId: 1,
    email: "test@example.com",
    nickname: "테스트유저",
};

export function MyPage() {
    return (
        <main>
            <h1>내 정보</h1>

            <section>
                <div>
                    <strong>회원 번호</strong>
                    <p>{MY_INFO.memberId}</p>
                </div>

                <div>
                    <strong>이메일</strong>
                    <p>{MY_INFO.email}</p>
                </div>

                <div>
                    <strong>닉네임</strong>
                    <p>{MY_INFO.nickname}</p>
                </div>

                <button type="button">
                    내 정보 수정
                </button>
            </section>
        </main>
    );
}