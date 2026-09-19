// 선택 미션 1 (추가 실험) — interface의 선언 병합은 파일 전체에 소급 적용돼요

interface Member {
  name: string;
}

// 같은 이름으로 다시 선언하면 오류 없이 하나로 합쳐져요
interface Member {
  level: number;
}

// 합쳐진 결과는 { name, level } — 위에서 선언했어도 아래 병합이 반영돼요
const member: Member = { name: "광수", level: 1 };

console.log("[미션1b] 병합 결과:", member.name, member.level);
export {};
