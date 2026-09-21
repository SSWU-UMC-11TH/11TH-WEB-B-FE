import React, { useState } from 'react'

interface Props {
  user: { email: string; nickname: string } | null
  onSave: () => void
}

export default function MyPageEdit({ user, onSave }: Props) {
  const [nickname, setNickname] = useState(user?.nickname ?? '')

  return (
    <section className="container my-edit">
      <h2>내 정보 수정</h2>
      <p>닉네임과 프로필 이미지만 변경할 수 있어요.</p>

      <div className="edit-grid">
        <div className="edit-left">
          <div className="profile-choose">
            <img src="/icons/person.svg" alt="person" />
            <img src="/icons/edit.svg" alt="edit" className="edit-icon" />
          </div>
          <div className="muted">선택 사항 · 최대 5MB</div>
        </div>

        <div className="edit-right">
          <label>닉네임</label>
          <div className="input-with-btn">
            <input value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <button type="button" className="small">중복 확인</button>
          </div>

          <label>이메일</label>
          <input value={user?.email ?? ''} readOnly />

          <div className="warning">
            <h4>회원 탈퇴</h4>
            <p>탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.</p>
            <button className="danger">회원 탈퇴</button>
          </div>

          <div className="actions">
            <button className="primary" onClick={onSave}>변경사항 저장</button>
          </div>
        </div>
      </div>
    </section>
  )
}
