import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { IconBlob } from "../ui/icon-blob";

export function HeroMedia() {
  return (
    <div className='flex gap-8 mt-6 max-md:justify-center'>
      <IconBlob>
        <Link
          href='https://github.com'
          aria-label='GitHub'
          className='text-text-primary hover:text-primary transition-colors p-3'
        >
          <Github size={32} />
        </Link>
      </IconBlob>

      <IconBlob>
        <Link
          href='https://linkedin.com'
          aria-label='LinkedIn'
          className='text-text-primary hover:text-primary transition-colors p-3'
        >
          <Linkedin size={32} />
        </Link>
      </IconBlob>

      <IconBlob>
        <Link
          href='mailto:email@example.com'
          aria-label='Email'
          className='text-text-primary hover:text-primary transition-colors p-3'
        >
          <Mail size={32} />
        </Link>
      </IconBlob>
    </div>
  );
}
