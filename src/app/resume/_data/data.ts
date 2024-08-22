import { ResumeData } from '@/types/resume'

export const dataProfile: ResumeData = {
  profile: {
    name: 'John Doe',
    email: 'johndoe@mail.com',
    phone: '+1 (555) 555-5555',
    location: 'Miami, FL',
    title: 'Software Engineer',
  },
  resume:
    'Fullstack web development specialist with expertise in front-end technologies...',
  experience: [
    {
      title: 'Full-stack Developer',
      company: 'Farmácias APP',
      location: 'Salvador, Brazil',
      startPeriod: 'Jul 2021',
      endPeriod: 'Present',
      description:
        'Fullstack web development specialist with expertise in front-end technologies...',
    },
  ],
  education: [
    {
      title: 'Bachelor of Science in Computer Science',
      institution: 'University of Miami',
      degree: 'BSc',
      startPeriod: '2017',
      endPeriod: '2021',
      description:
        'Computer Science is the study of computers and computational systems...',
    },
  ],
  links: [
    {
      icon: 'linkedin',
      url: 'https://www.linkedin.com/in/johndoe',
    },
    {
      icon: 'github',
      url: 'https://github.com/johndoe',
    },
    {
      icon: 'behance',
      url: 'https://www.behance.net/johndoe',
    },
    {
      icon: 'link',
      url: 'https://www.mywebsite.com',
    },
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'GraphQL', 'Docker'],
  languages: [
    {
      language: 'English',
      level: 'Conversational',
    },
    {
      language: 'Portuguese',
      level: 'Fluent',
    },
    {
      language: 'Spanish',
      level: 'Basic',
    },
  ],
}
