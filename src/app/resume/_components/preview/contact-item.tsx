import { AtSign, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'
import { FaLink, FaGithub, FaLinkedin, FaBehance } from 'react-icons/fa6'

import { removeUrlPrefix } from '@/lib/remove-url-sufix'

import { ResumePreviewProps } from '../resume-preview'

export const ContactItem = ({ resumeData, color }: ResumePreviewProps) => (
  <section className="flex gap-6 text-sm">
    <div>
      <div className="flex items-center gap-2">
        <AtSign size={16} color={color} />
        <p>{resumeData.profile.email}</p>
      </div>
      <div className="flex items-center gap-2">
        <Phone size={16} color={color} />
        <p>{resumeData.profile.phone}</p>
      </div>
      <div className="flex items-center gap-2">
        <MapPin size={16} color={color} />
        <p>{resumeData.profile.location}</p>
      </div>
    </div>
    <div>
      {resumeData.links.map((link, idx) => (
        <Link
          key={idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <span>
            {link.icon === 'link' && <FaLink size={16} color={color} />}
            {link.icon === 'github' && <FaGithub size={16} color={color} />}
            {link.icon === 'linkedin' && <FaLinkedin size={16} color={color} />}
            {link.icon === 'behance' && <FaBehance size={16} color={color} />}
          </span>
          <p>{removeUrlPrefix(link.url)}</p>
        </Link>
      ))}
    </div>
  </section>
)
