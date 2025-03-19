import { scrollToSection } from "@/utils/scroll-to-section";
import { ChevronDown } from "lucide-react";

export function ReadMore() {
  return (
    <div
      className='absolute bottom-8 left-0 right-0 flex flex-col items-center z-40 cursor-pointer hover:opacity-80 transition-opacity'
      onClick={() => scrollToSection("about")}
    >
      <p className='text-text-primary text-lg font-medium mb-2'>Read More</p>

      <ChevronDown size={28} className='animate-bounce' />
    </div>
  );
}
