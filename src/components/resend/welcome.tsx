import type * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

import {
  main,
  container,
  box,
  hr,
  paragraph,
  button,
  anchor,
  footer,
} from './styles'

interface PremiumWelcomeEmailProps {
  name?: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const PremiumWelcomeEmail = ({ name }: PremiumWelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Boas vindas | Rapid Resume</Preview>
        <Container style={container}>
          <Section style={box}>
            <Img
              src={`${baseUrl}/images/banner_readme.webp`}
              width="300"
              height="72"
              alt="Rapid Resume"
              className="mx-auto my-20"
            />

            <Hr style={hr} />
            <Text style={paragraph}>Bem vindo ao Rapid Resume {`${name}`}</Text>

            <Text style={paragraph}>
              Você acaba de ativar sua conta premium no Rapid Resume.
            </Text>

            <Text style={paragraph}>
              O Rapid Resume é uma ferramenta poderosa para criar currículos
              profissionais de qualidade e destacar seus trabalhos.
            </Text>

            <Text style={paragraph}>
              Você pode criar currículos de forma rápida e fácil, com um design
              elegante e um layout profissional.
            </Text>

            <Button style={button} href="https://rapid-resume.adrielgama.dev">
              {' '}
              Acessar o Rapid Resume{' '}
            </Button>

            <Text style={paragraph}>— Time Rapid Resume</Text>

            <Hr style={hr} />

            <Text style={footer}>
              Rapid Resume, Rua Silveira Martins, 552, Salvador, BA, Brasil
            </Text>
            <Text style={footer}>
              Rapid Resume - desenvolvido por{' '}
              <Link
                style={anchor}
                href="https://adrielgama.dev"
                target="_blank"
              >
                adrielgama.dev
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default PremiumWelcomeEmail
