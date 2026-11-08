export default function RequestStatus({ error }: { error?: string }) {
  return <p className="p-10 text-center text-[#6b7280]" role={error ? 'alert' : 'status'}>{error || '영화를 불러오는 중입니다...'}</p>
}
