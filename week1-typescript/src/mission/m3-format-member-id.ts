// 선택 미션 3 — unknown 값을 안전하게 구분해 처리하기

function formatMemberId(input: unknown) {
  if (typeof input === "number") {
    return "MEMBER-" + String(input).padStart(3, "0");
  }

  if (typeof input === "string") {
    return input.trim().toUpperCase();
  }

  return "알 수 없는 회원 번호예요.";
}

console.log("[미션3] 숫자 7        →", formatMemberId(7));
console.log("[미션3] 문자열        →", formatMemberId("  member-01  "));
console.log("[미션3] null          →", formatMemberId(null));
console.log("[미션3] 객체          →", formatMemberId({ name: "광수" }));
console.log("[미션3] undefined     →", formatMemberId(undefined));

// 좁히기 전에는 사용할 수 없어요 (주석을 풀면 TS18046)
// function unsafe(input: unknown) { return input.toUpperCase(); }
export {};
