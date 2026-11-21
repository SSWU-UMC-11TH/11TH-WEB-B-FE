export function getTokenMemberId(accessToken: string): string | null {
  const [, payload] = accessToken.split('.')
  if (!payload) return null

  // This reads the ID for a public lookup. The server still verifies the token.
  try {
    const { sub } = JSON.parse(atob(payload.replaceAll('-', '+').replaceAll('_', '/'))) as { sub?: unknown }
    if (typeof sub === 'number' && (!Number.isSafeInteger(sub) || sub <= 0)) return null
    if (typeof sub !== 'string' && typeof sub !== 'number') return null
    const memberId = String(sub)
    if (!/^[1-9]\d{0,18}$/.test(memberId) || BigInt(memberId) > 9223372036854775807n) return null
    return memberId
  } catch {
    return null
  }
}
