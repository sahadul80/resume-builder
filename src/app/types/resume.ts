// types/resume.ts
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  picture?: string; // Base64 or URL
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  gpa?: string;
  achievements?: string[];
  courses?: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
  achievements?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  period?: string;
  role?: string;
  highlights?: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Language {
  language: string;
  proficiency: 'Basic' | 'Conversational' | 'Professional' | 'Native';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Hobby {
  name: string;
  description?: string;
  icon?: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  languages: Language[];
  certifications: Certification[];
  hobbies: Hobby[];
  references?: string[];
}

export type TemplateStyle = 'modern' | 'professional' | 'creative';