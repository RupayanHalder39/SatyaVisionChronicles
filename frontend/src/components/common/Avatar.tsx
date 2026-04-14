import { resolveImageUrl } from '@/utils/image';

type AvatarProps = {
  name: string;
  imageUrl?: string | null;
  size?: number;
};

export function Avatar({ name, imageUrl, size = 64 }: AvatarProps) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase();

  const resolved = resolveImageUrl(imageUrl || undefined);

  return (
    <div
      className="flex items-center justify-center rounded-full bg-gradient-to-br from-[#6c9eff] to-[#a78bfa] text-white shadow-clay"
      style={{ width: size, height: size }}
    >
      {resolved ? (
        <img src={resolved} alt={name} className="h-full w-full rounded-full object-cover" />
      ) : (
        <span className="text-lg font-semibold">{initials}</span>
      )}
    </div>
  );
}
