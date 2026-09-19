// 선택 미션 2 — || 와 ?? 의 결과가 다른 이유

const studyHour: number | undefined = 0;

console.log("[미션2] studyHour        =", studyHour);
console.log("[미션2] studyHour || 1   =", studyHour || 1);
console.log("[미션2] studyHour ?? 1   =", studyHour ?? 1);

// 값이 정말 없을 때는 둘의 결과가 같아요
const notStudied: number | undefined = undefined;
console.log("[미션2] undefined || 1   =", notStudied || 1);
console.log("[미션2] undefined ?? 1   =", notStudied ?? 1);

// 빈 문자열에서도 같은 차이가 생겨요
const nickname: string | null = "";
console.log("[미션2] '' || 기본       =", JSON.stringify(nickname || "닉네임 없음"));
console.log("[미션2] '' ?? 기본       =", JSON.stringify(nickname ?? "닉네임 없음"));

// 각 연산자가 기준으로 삼는 것
console.log("[미션2] Boolean(0)       =", Boolean(0), "← || 는 이걸 봐요");
console.log("[미션2] 0 == null        =", 0 == null, "← ?? 는 이걸 봐요");
export {};
