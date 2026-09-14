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

function createMemberMessage(memberId: number): string {
    const member = members.find((member) => member.id === memberId);

    if (!member) {
        return "회원을 찾지 못했어요.";
    }

    const githubId = member.githubId ?? "등록되지 않음";

    return `${member.name}님은 ${member.role}입니다. GitHub: ${githubId}`;
}