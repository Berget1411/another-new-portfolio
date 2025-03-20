export function Separator({ children }: { children?: React.ReactNode }) {
  return (
    <div className='relative w-full flex items-center justify-center my-8 m'>
      {children ? (
        <>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full h-px bg-background-tertiary'></div>
          </div>
          <div className='relative z-10 px-6 bg-background-primary text-center'>
            {children}
          </div>
        </>
      ) : (
        <div className='w-full h-px bg-background-tertiary/50'></div>
      )}
    </div>
  );
}
