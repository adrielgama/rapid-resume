import { Loader2, Github, Linkedin } from 'lucide-react'
import { SiGoogle } from 'react-icons/si'

export const Icons = {
  spinner: Loader2,
  gitHub: Github,
  linkedin: Linkedin,
  google: ({ ...props }) => <SiGoogle {...props} />,
}
