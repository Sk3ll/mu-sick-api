import {
  Button,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

export default function Email() {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Container
        style={{
          backgroundColor: 'black',
          minWidth: '100%',
          minHeight: '100vh',
          backgroundImage:
            'url("https://firebasestorage.googleapis.com/v0/b/musick-29884.appspot.com/o/output-onlinepngtools%20(10).png?alt=media&token=875c9db5-5503-45ca-bbd0-9a132d4bdd20")',
          backgroundSize: 'cover',
        }}
      >
        <Img
          alt="Background"
          height="320"
          src="https://firebasestorage.googleapis.com/v0/b/musick-29884.appspot.com/o/main-bg.webp?alt=media&token=3ce4de67-657e-4d9f-aec3-67dd338b7d16"
          style={{
            width: '100%',
            borderRadius: 12,
            objectFit: 'cover',
          }}
        />

        <Section
          style={{
            marginTop: 16,
            marginBottom: 16,
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          <Section
            style={{
              marginTop: 32,
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <Text
              style={{
                marginTop: 16,
                marginBottom: 16,
                fontSize: 30,
                lineHeight: '28px',
                fontWeight: 900,
                color: 'rgb(198, 81, 15)',
              }}
            >
              PRE-REGISTRATION COMPLETE
            </Text>
            <Heading
              as="h1"
              style={{
                margin: '0px',
                marginTop: 8,
                fontSize: 36,
                lineHeight: '36px',
                fontWeight: 600,
                color: 'rgb(255, 255, 255)',
              }}
            >
              Thank you for your participation!
            </Heading>
            <Text
              style={{
                fontSize: 16,
                lineHeight: '24px',
                color: 'rgb(254, 254, 254)',
              }}
            >
              We will share the winner announcement after live event! Make sure
              to follow us on Instagram and TikTok so you don't miss anything!
            </Text>
            <Button
              href="https://linktr.ee/musick.project"
              style={{
                marginTop: 16,
                borderRadius: 8,
                backgroundColor: 'rgb(208, 56, 10)',
                paddingLeft: 40,
                paddingRight: 40,
                paddingTop: 12,
                paddingBottom: 12,
                fontWeight: 600,
                color: 'rgb(255,255,255)',
              }}
            >
              Follow
            </Button>
          </Section>
        </Section>
      </Container>
    </Html>
  );
}
