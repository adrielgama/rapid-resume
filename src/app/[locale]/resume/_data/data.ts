import { ResumeData } from '@/types/resume'

export const defaultResumeData: ResumeData = {
  personal: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+55 (11) 99999-9999',
    location: 'Brasília, Distrito Federal, Brazil',
    links: [
      'https://github.com/johndoe',
      'https://www.linkedin.com/in/johndoe',
    ],
  },
  education: [
    {
      school: 'Universidade de Brasília',
      degree: 'Análise e Desenvolvimento de Sistemas',
      year: '2025',
    },
  ],
  experience: [
    {
      company: 'Tech Solutions',
      position: 'Desenvolvedor Fullstack Pleno',
      period: 'Jul 2021 a Atual',
      skills: [
        'Responsável pela manutenção de aplicações web e suporte no desenvolvimento backend, atuando com ReactJS, TypeScript e NextJS no front-end, enquanto auxilia na integração e otimização de APIs desenvolvidas com Node, Express e Nest, garantindo interfaces responsivas e aplicações de alto desempenho.',
        'Participação ativa na implementação de testes automatizados, utilizando Jest e Cypress, assegurando a qualidade e confiabilidade do código, além de contribuir para a melhoria contínua dos processos de desenvolvimento ágil, promovendo práticas como Code Review e integração contínua.',
        'Colaboração com equipes multifuncionais para identificar e resolver problemas técnicos, oferecendo suporte técnico e treinamento a membros da equipe, promovendo um ambiente de aprendizado contínuo e compartilhamento de conhecimento.',
      ],
      achievements: [
        'Desenvolvimento de uma aplicação de gerenciamento de projetos que aumentou a eficiência da equipe em 30%.',
        'Implementação de um sistema de autenticação que reduziu o tempo de login em 50%.',
        'Participação em um projeto de migração de dados que economizou 20% do tempo de desenvolvimento.',
      ],
    },
  ],
  skills: [
    'JavaScript',
    'React',
    'Node.js',
    'TypeScript',
    'CSS',
    'HTML',
    'SQL',
    'MongoDB',
    'Git',
    'Agile',
    'Scrum',
    'Jest',
    'Cypress',
    'NestJS',
    'Express',
    'NextJS',
    'Tailwind CSS',
    'Figma',
    'PostgreSQL',
  ],
  summary:
    'Sou um desenvolvedor apaixonado por tecnologia e inovação. Gosto de aprender novas tecnologias e aplicar meus conhecimentos em projetos desafiadores.',
  languages: [
    { language: 'Inglês', level: 'Fluente' },
    { language: 'Espanhol', level: 'Intermediário' },
    { language: 'Português', level: 'Nativo' },
  ],
  certifications: [
    { name: 'Certificação em JavaScript', year: '2022' },
    { name: 'Certificação em React', year: '2023' },
    { name: 'Certificação em Node.js', year: '2024' },
  ],
}
