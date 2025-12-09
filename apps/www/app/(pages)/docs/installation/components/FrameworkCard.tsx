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
    <Link href={href} className="group relative flex flex-col rounded-lg border bg-background overflow-hidden hover:border-foreground/20 transition-all hover:shadow-md p-4 gap-4">
      {/* En-tête : Logo + Titre - toujours alignés en haut */}
      <div className='flex items-center gap-4 w-full'>
        <Image src={logo} alt={`Logo de ${name}`} width={45} height={45} className="shrink-0"/>
        <p className="font-semibold text-xl text-left">{name}</p>
      </div>

      {/* Description - peut prendre 1 ou 2 lignes */}
      <p className="font-normal text-sm text-muted-foreground text-left w-full">{description}</p>

      {/* Icône hover */}
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
  )
}

export default FrameworkCard