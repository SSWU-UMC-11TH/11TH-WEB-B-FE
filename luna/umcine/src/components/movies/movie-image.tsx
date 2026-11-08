import { useState } from 'react'
import { cn } from '../../utils/cn'

interface Props {
  path: string | null
  alt: string
  className: string
  backdrop?: boolean
  onClick?: () => void
}

export default function MovieImage({ path, ...props }: Props) {
  return <ImageView key={path} path={path} {...props} />
}

function ImageView({ path, alt, className, backdrop, onClick }: Props) {
  const [failed, setFailed] = useState(false)
  if (!path || failed) return (
    <div className={cn(className, 'flex items-center justify-center bg-gray-300 text-sm text-gray-700')} role="img" aria-label={`${alt}: 이미지 없음`} onClick={onClick}>이미지 없음</div>
  )
  return <img src={`https://image.tmdb.org/t/p/${backdrop ? 'w1280' : 'w500'}${path}`} alt={alt} className={className} onClick={onClick} onError={() => setFailed(true)} />
}
