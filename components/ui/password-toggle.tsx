import * as React from "react"

import { Input } from "./input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { cn } from "../../lib/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}

// const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
//     ({ className, ...props }, ref) => {
//         const [showPassword, setShowPassword] = React.useState(false);
//         return (
//             <Input type={showPassword ? "text" : "password"} suffix={showPassword ? (<EyeIcon className="select-none" onClick={() => setShowPassword(false)} />) : (<EyeOffIcon className="select-none" onClick={() => setShowPassword(true)} />)} className={className} {...props} ref={ref} />
//         )
//     }
// )
// PasswordInput.displayName = "PasswordInput"

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative w-full">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)} // Add padding so icon doesn't overlap text
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-2 flex items-center text-muted-foreground"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeIcon className="size-4" />
          ) : (
            <EyeOffIcon className="size-4" />
          )}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";


export { PasswordInput }
