import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface AuthInputProps {
  control: any
  name: string
  type?: string
  placeholder: string
  onBlur?: () => void
  icon: any
  iconClick?: () => void
  disabled: boolean
}

const AuthInput: React.FC<AuthInputProps> = ({
  control,
  type,
  placeholder,
  name,
  onBlur,
  icon: Icon,
  iconClick,
  disabled,
}) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative group">
              <Input
                className="pr-8 placeholder:text-muted-foreground/60 transition bg-background/95"
                {...field}
                placeholder={placeholder}
                type={type}
                onBlur={onBlur}
                disabled={disabled}
              />
              <Icon
                onClick={iconClick}
                size={20}
                className={cn(
                  'absolute transition right-2.5 -translate-y-1/2 top-1/2 text-muted-foreground/60 group-focus-within:text-foreground',
                  iconClick && 'cursor-pointer'
                )}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default AuthInput
