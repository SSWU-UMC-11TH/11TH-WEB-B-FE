type MemberRole = "leader" | "member";

interface Member {
  id: number;
  name: string;
  role: MemberRole;
  githubId?: string;
}

const members: Member[] = [
  {
    id: 1,
    name: "재경",
    role: "leader",
    githubId: "jaeky",
  },
  {
    id: 2,
    name: "민지",
    role: "member",
  },
];

const findMemberById = (memberId: number): string => {
  const member = members.find((member) => member.id === memberId);

  if (!member) {
    return "회원을 찾을 수 없습니다.";
  }

  return `${member.name} / ${member.role} / GitHub: ${
    member.githubId ?? "등록되지 않음"
  }`;
};

console.log(findMemberById(1));
console.log(findMemberById(2));
console.log(findMemberById(999));
