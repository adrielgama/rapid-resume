/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'

import { GripVertical, PlusCircle, Trash } from 'lucide-react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { FaBehance, FaGithub, FaLinkedin } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { additionalLinks, defaultLinks, Link, LinkType } from '@/types/links'
import { ResumeData } from '@/types/resume'

import { UrlInput } from '../url.input'

interface LinksStepProps {
  resumeData: ResumeData
  setResumeData: (data: ResumeData) => void
}

const linkPrefixes: Record<LinkType, string> = {
  linkedin: 'https://www.linkedin.com/in/',
  github: 'https://github.com/',
  behance: 'https://www.behance.net/',
  personal: 'https://yourpersonalwebsite.com/',
  link: '',
}

function LinksStep({ resumeData, setResumeData }: LinksStepProps) {
  const [links, setLinks] = useState(resumeData.links || defaultLinks)

  const handleLinkChange = (
    index: number,
    field: keyof Link,
    value: string
  ) => {
    const updatedLinks = [...links]
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value,
    }
    setLinks(updatedLinks)
    setResumeData({ ...resumeData, links: updatedLinks })
  }

  const addLink = (link: Link) => {
    setLinks([...links, link])
    setResumeData({ ...resumeData, links: [...links, link] })
  }

  const removeLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index)
    setLinks(updatedLinks)
    setResumeData({ ...resumeData, links: updatedLinks })
  }

  const isLinkAdded = (type: LinkType) =>
    links.some((link) => link.icon === type)

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const reorderedLinks = Array.from(links)
    const [removed] = reorderedLinks.splice(result.source.index, 1)
    reorderedLinks.splice(result.destination.index, 0, removed)

    setLinks(reorderedLinks)
    setResumeData({ ...resumeData, links: reorderedLinks })
  }

  return (
    <div className="rounded-md p-4">
      <h2 className="text-xl font-semibold text-dark-blue dark:text-neutral-200">
        Links
      </h2>
      <Label htmlFor="header" className="mt-4">
        Select your links
      </Label>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="links">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="mt-4 grid grid-cols-1 gap-4"
            >
              {links.map((link, index) => (
                <Draggable
                  key={link.icon + '-' + index}
                  draggableId={link.icon + '-' + index}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center space-x-2 space-y-1"
                    >
                      <GripVertical className="h-4 w-4" />
                      <UrlInput
                        prefix={linkPrefixes[link.icon]}
                        value={link.url}
                        onChange={(value) =>
                          handleLinkChange(index, 'url', value)
                        }
                        placeholder={`Enter your ${link.icon} username`}
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeLink(index)}
                        disabled={defaultLinks.some(
                          (defaultLink) => defaultLink.icon === link.icon
                        )}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="mt-6">
        <Label>Add more links</Label>
        <div className="mt-2 grid grid-cols-3 gap-4">
          {additionalLinks.map((link) => (
            <Button
              key={link.icon}
              variant="outline"
              onClick={() => addLink(link)}
              disabled={isLinkAdded(link.icon) && link.icon !== 'link'}
            >
              {link.icon === 'github' ? (
                <FaGithub className="h-4 w-4" />
              ) : link.icon === 'behance' ? (
                <FaBehance className="h-4 w-4" />
              ) : link.icon === 'linkedin' ? (
                <FaLinkedin className="h-4 w-4" />
              ) : (
                link.icon === 'link' && <PlusCircle className="h-4 w-4" />
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LinksStep
