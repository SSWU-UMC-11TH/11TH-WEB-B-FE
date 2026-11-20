import { PersonIcon } from "../icons";

interface ProfileAvatarProps {
  imageDataUrl: string | null;
}

export function ProfileAvatar({ imageDataUrl }: ProfileAvatarProps) {
  return (
    <div className="grid h-[82px] w-[82px] shrink-0 place-items-center overflow-hidden rounded-full bg-[#e3e6eb] text-[#17191e]">
      {imageDataUrl ? (
        <img src={imageDataUrl} alt="프로필 이미지" className="h-full w-full object-cover" />
      ) : (
        <PersonIcon width={48} height={48} />
      )}
    </div>
  );
}
