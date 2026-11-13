import type { ReactNode } from 'react';
import type { ItemId } from './data';

interface ItemIconProps {
  id: ItemId;
  size?: number;
  title?: string;
}

const shapes: Record<ItemId, ReactNode> = {
  apple: (
    <>
      <path d='M32 20c-5-4-16-3-18 9-2 12 6 25 12 25 3 0 4-1.5 6-1.5s3 1.5 6 1.5c6 0 14-13 12-25-2-12-13-13-18-9z' fill='#e5484d' />
      <path d='M20 30c1-4 3-6 6-7' stroke='#ffb3b5' strokeWidth='2.5' strokeLinecap='round' fill='none' />
      <path d='M32 20c0-5 1-8 4-11' stroke='#7a4a21' strokeWidth='3' strokeLinecap='round' fill='none' />
      <path d='M36 13c4-5 10-5 13-3-2 5-8 7-13 3z' fill='#4caf50' />
    </>
  ),
  pear: (
    <>
      <path d='M32 16c-6 0-8 5-8 10 0 5-8 9-8 18 0 9 7 13 16 13s16-4 16-13c0-9-8-13-8-18 0-5-2-10-8-10z' fill='#b5cc39' />
      <path d='M22 42c0-4 2-7 5-9' stroke='#e2ee9a' strokeWidth='2.5' strokeLinecap='round' fill='none' />
      <path d='M32 16c0-4 1-6 3-8' stroke='#7a4a21' strokeWidth='3' strokeLinecap='round' fill='none' />
      <path d='M35 11c4-4 9-4 12-2-2 4-7 6-12 2z' fill='#4caf50' />
    </>
  ),
  banana: (
    <>
      <path d='M12 21c2 19 16 31 36 29 4-0.5 6-3 5-5-14 2-28-6-34-24-0.5-2-7-2-7 0z' fill='#f6c927' />
      <path d='M16 26c5 13 15 21 28 22' stroke='#d9a50f' strokeWidth='2' strokeLinecap='round' fill='none' />
      <path d='M12 21l-1-6 5-1 3 6z' fill='#7a5a21' />
      <path d='M48 50c3-0.5 5-2 5-5l3 1c0 3-3 5-7 5z' fill='#7a5a21' />
    </>
  ),
  carrots: (
    <>
      <path d='M33 25c0-8 4-14 10-16-1 7-3 12-8 17z' fill='#4caf50' />
      <path d='M35 27c6-6 13-8 19-6-4 6-10 9-17 8z' fill='#3d9142' />
      <path d='M24 24c6-4 14 2 14 8-4 10-16 22-26 24-2 0.5-3-1-2.5-2.5C12 44 18 30 24 24z' fill='#f5862b' />
      <path d='M25 31l5 4M20 39l5 3M16 47l4 2' stroke='#c96412' strokeWidth='2' strokeLinecap='round' fill='none' />
    </>
  ),
  onions: (
    <>
      <path d='M32 18c-1-4-1-8 0-12M33 18c2-4 5-6 8-7' stroke='#4caf50' strokeWidth='3' strokeLinecap='round' fill='none' />
      <path d='M32 18c-4 6-18 10-18 24 0 10 8 14 18 14s18-4 18-14c0-14-14-18-18-24z' fill='#b565a7' />
      <path d='M32 22c-6 8-8 18-4 32M32 22c6 8 8 18 4 32' stroke='#8e4585' strokeWidth='2' strokeLinecap='round' fill='none' />
      <path d='M28 56l-1 4M32 56v5M36 56l1 4' stroke='#b9ad9a' strokeWidth='2' strokeLinecap='round' fill='none' />
    </>
  ),
  garlic: (
    <>
      <path d='M32 8c-1 8-2 12-8 17-6 5-10 10-10 18 0 9 8 13 18 13s18-4 18-13c0-8-4-13-10-18-6-5-7-9-8-17z' fill='#f4efe6' stroke='#b9ad9a' strokeWidth='2' strokeLinejoin='round' />
      <path d='M32 22c-6 8-8 20-4 33M32 22c6 8 8 20 4 33' stroke='#b9ad9a' strokeWidth='2' strokeLinecap='round' fill='none' />
      <path d='M28 57l-1 3M32 57v4M36 57l1 3' stroke='#9c8f7a' strokeWidth='2' strokeLinecap='round' fill='none' />
    </>
  ),
  cabbage: (
    <>
      <circle cx='32' cy='34' r='24' fill='#6fae3a' />
      <circle cx='32' cy='34' r='17' fill='#8bc34a' />
      <circle cx='32' cy='34' r='9' fill='#b4dc7c' />
      <path d='M32 10v48M12 24c8 2 14 6 20 12M52 24c-8 2-14 6-20 12' stroke='#4f8a26' strokeWidth='2' strokeLinecap='round' fill='none' />
    </>
  ),
  potatoes: (
    <>
      <ellipse cx='32' cy='34' rx='24' ry='17' transform='rotate(-18 32 34)' fill='#c8a165' />
      <path d='M16 32c2-6 7-10 13-12' stroke='#e3c594' strokeWidth='2.5' strokeLinecap='round' fill='none' />
      <circle cx='26' cy='38' r='2' fill='#8d6b3a' />
      <circle cx='38' cy='28' r='2' fill='#8d6b3a' />
      <circle cx='42' cy='40' r='1.5' fill='#8d6b3a' />
      <circle cx='31' cy='29' r='1.5' fill='#8d6b3a' />
    </>
  ),
};

export function ItemIcon({ id, size = 24, title }: ItemIconProps) {
  return (
    <svg
      className='item-icon'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 64 64'
      width={size}
      height={size}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable='false'
    >
      {shapes[id]}
    </svg>
  );
}
