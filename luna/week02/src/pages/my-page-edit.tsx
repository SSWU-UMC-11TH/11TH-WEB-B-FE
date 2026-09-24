import React, { useState } from 'react'

interface Props {
  user: { email: string; nickname: string } | null
  onSave: () => void
}

export default function MyPageEdit({ user, onSave }: Props) {
  const [nickname, setNickname] = useState(user?.nickname ?? '')

  return (
    <section className="container my-edit">
      <div className="edit-header">
        <div>
          <h2>내 정보 수정</h2>
          <p>닉네임과 프로필 이미지만 변경할 수 있어요.</p>
        </div>
        <button className="save-btn" onClick={onSave}>변경사항 저장</button>
      </div>
      <div className="edit-main">
        <div className="edit-profile">
          <div className="profile-avatar-wrap">
            <div className="avatar"><img src="/icons/person.svg" alt="프로필" /></div>
            <span className="profile-edit-icon"><img src="/icons/edit.svg" alt="프로필 수정" /></span>
          </div>
          <strong>프로필 이미지</strong>
          <div className="muted">선택 사항 · 최대 5MB</div>
        </div>

        <div className="edit-fields">
          <div className="field">
            <label htmlFor="profile-nickname">닉네임</label>
            <div className="input-with-btn">
              <input id="profile-nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
              <button type="button" className="small">중복 확인</button>
            </div>
          </div>
          <div className="field">
            <label htmlFor="profile-email">이메일</label>
            <input id="profile-email" value={user?.email ?? ''} readOnly />
          </div>
        </div>
      </div>
      <section className="danger-zone" aria-labelledby="danger-title">
        <div>
          <h4 id="danger-title">회원 탈퇴</h4>
          <p>탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.</p>
        </div>
        <button type="button" className="danger">회원 탈퇴</button>
      </section>
    </section>
  )
}
