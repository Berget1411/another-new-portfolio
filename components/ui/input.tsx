import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export function Input(props: InputProps) {
  return (
    <div className={cn("relative", props.className)}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        {...props}
        className='w-full rounded-md border mt-2 border-background-tertiary bg-background-tertiary/30 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/100 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
      />

      {props.error && (
        <p className='text-color-error text-sm mt-1'>{props.error}</p>
      )}
      {props.helperText && (
        <p className='text-color-secondary text-sm'>{props.helperText}</p>
      )}
    </div>
  );
}
