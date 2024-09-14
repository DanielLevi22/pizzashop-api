import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Img,
} from '@react-email/components'

interface EmailTemplateProps {
  authLinkString: string
}

export const EmailTemplate = ({ authLinkString }: EmailTemplateProps) => (
  <Html>
    <Head />
    <Body style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
      <Container style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
        <Section style={{ textAlign: 'center', padding: '20px' }}>
          <Img
            src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg"
            alt="Pizza Shop Logo"
            width="150"
            style={{ marginBottom: '20px', textAlign: 'center' }}
          />
          <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
            Welcome to Pizza Shop!
          </Text>
          <Text style={{ fontSize: '16px', color: '#666', marginTop: '10px' }}>
            Click the button below to authenticate and access your dashboard:
          </Text>
          <Section style={{ marginTop: '20px' }}>
            <Link
              href={authLinkString}
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#ff5722',
                borderRadius: '5px',
                textDecoration: 'none',
              }}
            >
              Authenticate Now
            </Link>
          </Section>
        </Section>
      </Container>
    </Body>
  </Html>
)
