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