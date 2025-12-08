import { cn } from '@/lib/utils';
import { Button } from '@/ui/components/Button';
import Image from 'next/image';
import Link from 'next/link';

interface frameworkCardProps {
    href : string;
    logo : string;
    name : string;
    description : string;
    className?: string;
}

const FrameworkCard = ({href, logo, name, description, className} : frameworkCardProps) => {
  return (
    <Button className={cn('w-full h-auto py-4 px-6 bg-muted/30 group relative border text-foreground hover:border-foreground/20 transition-all hover:shadow-md', className)} asChild variant='secondary'>
      <Link href={href} className="flex items-center gap-4 h-full ">
        <Image src={logo} alt={`Logo de ${name}`} width={40} height={40} className="shrink-0"/>
        <div className='grid gap-2 text-left'>
          <p className="font-semibold truncate text-xl">{name}</p>
          <p className="text-xs whitespace-normal wrap-break-word font-normal">{description}</p>
        </div>
        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </div>
      </Link>
    </Button>
  )
}

export default FrameworkCard