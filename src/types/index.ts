// Core type definitions for the application

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  features: string[];
  color: 'primary' | 'secondary' | 'accent';
}

export interface Project {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  image: string;
  category: 'penetration-testing' | 'security-audit' | 'network-security' | 'cloud-security' | 'it-infrastructure';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  readTime: number; // in minutes
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  messageType: 'general' | 'security-audit' | 'penetration-testing' | 'consulting' | 'support';
  message: string;
}

export interface NavLink {
  label: string;
  path: string;
  Icon?: React.ComponentType<{ className?: string }>;
}

export interface Stat {
  label: string;
  value: string | number;
  suffix?: string;
  prefix?: string;
}

// Button component props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Input component props
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

// TextArea component props
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCharCount?: boolean;
}

// Animation variants type
export type AnimationVariant = {
  hidden: any;
  visible: any;
  exit?: any;
};

// Route configuration
export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  title: string;
  description?: string;
}
