export type LinkType = 'linkedin' | 'github' | 'behance' | 'personal' | 'link'

export interface Link {
  icon: LinkType
  url: string
}

export const defaultLinks: Link[] = [
  { icon: 'linkedin', url: 'https://www.linkedin.com/in/' },
]

export const additionalLinks: Link[] = [
  { icon: 'github', url: 'https://github.com/' },
  { icon: 'behance', url: 'https://www.behance.net/' },
  { icon: 'link', url: '' },
]
