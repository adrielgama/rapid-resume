import type * as React from 'react'

import {
  Body,
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

import { main, container, box, hr, paragraph, anchor, footer } from './styles'

export const PremiumCanceledEmail = () => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Assinatura cancelada | Rapid Resume</Preview>
        <Container style={container}>
          <Section style={box}>
            <Img
              src="https://rapid-resume.adrielgama.dev/images/banner_readme.webp"
              width="300"
              height="72"
              alt="Rapid Resume"
              className="mx-auto my-20"
            />

            <Hr style={hr} />
            <Text style={paragraph}>Olá,</Text>

            <Text style={paragraph}>
              Sua assinatura premium do Rapid Resume foi cancelada com sucesso!
            </Text>

            <Text style={paragraph}>
              Caso deseje reativar sua assinatura, basta acessar o painel.
            </Text>

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

export default PremiumCanceledEmail
