import { cn } from "@/lib/utils";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export function TextArea({
  label,
  error,
  helperText,
  className,
  ...props
}: TextAreaProps) {
  return (
    <div className={cn("relative", className)}>
      {label && <label htmlFor={props.id}>{label}</label>}
      <textarea
        className={cn(
          "w-full rounded-md border mt-2 border-background-tertiary bg-background-tertiary/30 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/100 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />

      {error && <p className='text-color-error text-sm mt-1'>{error}</p>}
      {helperText && (
        <p className='text-color-secondary text-sm'>{helperText}</p>
      )}
    </div>
  );
}
