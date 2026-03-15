import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '@config/constants';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  clickable?: boolean;
}

export default function Logo({ className = '', size = 'md', clickable = true }: LogoProps) {
  const sizeStyles = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };
  
  const content = (
    <div className={`flex items-center gap-2 ${sizeStyles[size]} font-heading font-bold ${className}`}>
      <span className="text-red-500">{COMPANY_INFO.name.split(' ')[0]}</span>
      <span className="text-white">{COMPANY_INFO.name.split(' ')[1]}</span>
    </div>
  );
  
  if (clickable) {
    return (
      <Link to="/" className="hover:opacity-80 transition-opacity duration-300">
        {content}
      </Link>
    );
  }
  
  return content;
}
