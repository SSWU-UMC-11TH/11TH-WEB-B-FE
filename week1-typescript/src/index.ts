// 스터디 회원 관리 프로그램

// 역할은 정해진 두 가지 중 하나예요 (리터럴 유니언)
type MemberRole = "leader" | "member";

// githubId는 있어도 되고 없어도 되는 선택 값이에요
interface StudyMember {
  id: number;
  name: string;
  role: MemberRole;
  githubId?: string;
}

const members: StudyMember[] = [
  { id: 1, name: "광수", role: "leader", githubId: "gwangsoo" },
  { id: 2, name: "지수", role: "member" }, // GitHub 아이디가 없는 회원
  { id: 3, name: "현우", role: "member", githubId: "hyunwoo" },
];

// 찾지 못하면 undefined를 반환해요
function findMemberById(memberId: number): StudyMember | undefined {
  return members.find((member) => member.id === memberId);
}

function describeRole(role: MemberRole) {
  return role === "leader" ? "스터디를 이끌어요" : "스터디에 참여해요";
}

function createMemberCard(memberId: number) {
  const foundMember = findMemberById(memberId);

  // 없는 회원은 여기서 걸러요. 이 아래부터 foundMember는 StudyMember로 좁혀져요
  if (!foundMember) {
    return memberId + "번 회원을 찾지 못했어요.";
  }

  // githubId가 undefined일 때만 기본 문구를 써요
  const githubId = foundMember.githubId ?? "등록되지 않음";

  return (
    "[" + foundMember.id + "] " + foundMember.name + " 님 — " +
    describeRole(foundMember.role) + " · GitHub: " + githubId
  );
}

console.log(createMemberCard(1));   // 모든 정보가 있는 회원
console.log(createMemberCard(2));   // GitHub 아이디가 없는 회원
console.log(createMemberCard(999)); // 존재하지 않는 회원

// 없는 회원의 프로퍼티를 읽어도 ?. 덕분에 오류가 나지 않아요
const missingGithub = findMemberById(999)?.githubId ?? "등록되지 않음";
console.log("999번 회원의 GitHub:", missingGithub);
