interface StudyMember {
    id: number;
    name: string;
    role: "leader" | "member";
    githubId?: string;
}

const members: StudyMember[] = [
    {
        id: 1,
        name: "광수",
        role: "leader",
        githubId: "gwangsoo",
    },
    {
        id: 2,
        name: "지수",
        role: "member",
    },
];

/**
 * 회원 ID를 통해 회원을 찾고 회원 정보를 문자열로 반환합니다.
 *
 * @param memberId 조회할 회원의 ID
 * @returns 회원 정보 또는 회원을 찾을 수 없다는 메시지
 */

function createMemberMessage(memberId: number): string {
    const foundMember = members.find(
        (member) => member.id === memberId
    );

    if (!foundMember) {
        return "회원을 찾을 수 없습니다.";
    }

    return `${foundMember.name} / ${foundMember.role} / GitHub: ${foundMember.githubId ?? "등록되지 않음"
        }`;
}

console.log("1번 회원");
console.log(createMemberMessage(1));

console.log("\n2번 회원");
console.log(createMemberMessage(2));

console.log("\n999번 회원");
console.log(createMemberMessage(999));