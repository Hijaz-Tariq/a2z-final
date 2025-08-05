// import * as React from "react"



// import { Input } from "./input"
// import { Smartphone, MailIcon } from "lucide-react"




// // eslint-disable-next-line @typescript-eslint/no-empty-object-type
// export interface TelInputProps
//     extends React.InputHTMLAttributes<HTMLInputElement> {
// }


// const TelInput = React.forwardRef<HTMLInputElement, TelInputProps>(
//     ({ className, ...props }, ref) => {

//         const [showTel, setShowTel] = React.useState(false);
        
//         return (

//             <Input type={showTel ? "number" : "email"} placeholder={showTel ? "0123456789" : ""} suffix={showTel ? (<MailIcon className="select-none" onClick={() => setShowTel(false)} />) : (<Smartphone className="select-none" onClick={() => setShowTel(true)} />)} className={className} {...props} ref={ref}
//             />
            
//         )
//     }
// )
// TelInput.displayName = "TelInput"

// export { TelInput }



import * as React from "react"
import { Input } from "./input"
import { Smartphone, MailIcon } from "lucide-react"
import { cn } from "../../lib/utils" // Assuming you are using this

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const TelInput = React.forwardRef<HTMLInputElement, TelInputProps>(
  ({ className, ...props }, ref) => {
    const [showTel, setShowTel] = React.useState(false)

    return (
      <div className="relative w-full">
        <Input
          type={showTel ? "number" : "email"}
          placeholder={showTel ? "0123456789" : ""}
          className={cn("pr-10", className)} // padding to avoid icon overlap
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowTel((prev) => !prev)}
          className="absolute inset-y-0 right-2 flex items-center text-muted-foreground"
          tabIndex={-1}
        >
          {showTel ? (
            <MailIcon className="size-4" />
          ) : (
            <Smartphone className="size-4" />
          )}
        </button>
      </div>
    )
  }
)

TelInput.displayName = "TelInput"

export { TelInput }
