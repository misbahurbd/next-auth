'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SocialAuthButtonProps {
  icon: any
  label: string
  onClick: () => void
  bgColor?: 'fb' | 'google'
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  bgColor,
}) => {
  return (
    <Button
      onClick={() => onClick()}
      className={cn(
        'flex gap-2 w-full shadow transition hover:shadow-md text-muted-foreground bg-background/95',
        bgColor && bgColor === 'fb' && 'hover:bg-[#4267B2] hover:text-white',
        bgColor && bgColor === 'google' && 'hover:bg-[#DB4437] hover:text-white'
      )}
      variant="outline"
    >
      <Icon />
      <span>{label}</span>
    </Button>
  )
}

export default SocialAuthButton
