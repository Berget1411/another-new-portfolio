import { HeroBackground } from "./hero-background";

export function Hero() {
  return (
    <section
      className='relative w-full h-[100dvh] overflow-hidden'
      id='hero-section'
    >
      <HeroBackground />
      <div className='absolute inset-0 flex flex-col items-center justify-center h-full w-full'>
        <h1 className='relative z-10 text-4xl md:text-6xl font-bold mb-6'>
          Ludvig
        </h1>
        <div className='relative z-10 mt-4'>Read more</div>
      </div>
    </section>
  );
}
