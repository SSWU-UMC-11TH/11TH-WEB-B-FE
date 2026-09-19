// 선택 미션 1 — 같은 모양을 type과 interface로 각각 작성하기

type StudyMemberType = {
  name: string;
  level: number;
  githubId?: string;
};

interface StudyMemberInterface {
  name: string;
  level: number;
  githubId?: string;
}

// 같은 점 ① — 객체 모양을 똑같이 표현하고, 검사 결과도 같아요
const byType: StudyMemberType = { name: "광수", level: 1 };
const byInterface: StudyMemberInterface = { name: "지수", level: 2 };

// 같은 점 ② — 구조가 같으면 서로 바꿔 쓸 수 있어요 (구조적 타이핑)
const swapped1: StudyMemberType = byInterface;
const swapped2: StudyMemberInterface = byType;

// 다른 점 ① — type만 객체가 아닌 타입에 이름을 붙일 수 있어요
type MemberRole = "leader" | "member";
const role: MemberRole = "leader";

// 다른 점 ② — 확장 방법이 달라요 (& 조합 vs extends 상속)
type WithGithubType = StudyMemberType & { githubId: string };
interface WithGithubInterface extends StudyMemberInterface {
  githubId: string;
}

const t: WithGithubType = { name: "현우", level: 3, githubId: "hyunwoo" };
const i: WithGithubInterface = { name: "수빈", level: 4, githubId: "subin" };

console.log("[미션1] 같은 점:", swapped1.name, swapped2.level);
console.log("[미션1] 다른 점:", role, t.githubId, i.githubId);
export {};
