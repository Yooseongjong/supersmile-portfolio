import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactEmailProps {
    name: string;
    email: string;
    message: string;
}

export const ContactEmail = ({
    name,
    email,
    message,
}: ContactEmailProps) => (
    <Html>
        <Head />
        <Preview>New Message from SuperSmile Creative Website</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>New Project Inquiry</Heading>
                <Text style={text}>
                    You received a new message from the contact form on your website.
                </Text>

                <Section style={section}>
                    <Text style={label}>Name:</Text>
                    <Text style={value}>{name}</Text>

                    <Text style={label}>Email:</Text>
                    <Text style={value}>{email}</Text>

                    <Hr style={hr} />

                    <Text style={label}>Message:</Text>
                    <Text style={messageText}>{message}</Text>
                </Section>

                <Hr style={hr} />
                <Text style={footer}>
                    Sent from SuperSmile Creative Portfolio
                </Text>
            </Container>
        </Body>
    </Html>
);

export default ContactEmail;

const main = {
    backgroundColor: '#0a0a0a',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#000000',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    maxWidth: '600px',
    border: '1px solid #333',
    borderRadius: '12px',
};

const h1 = {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '40px',
    margin: '0 0 20px',
    padding: '0 24px',
    textAlign: 'center' as const,
};

const text = {
    color: '#cccccc',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'left' as const,
    padding: '0 24px',
};

const section = {
    padding: '24px',
    borderTop: '1px solid #333',
};

const label = {
    color: '#888888',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '4px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
};

const value = {
    color: '#ffffff',
    fontSize: '16px',
    marginBottom: '16px',
};

const messageText = {
    color: '#ffffff',
    fontSize: '16px',
    lineHeight: '26px',
    whiteSpace: 'pre-wrap' as const,
};

const hr = {
    borderColor: '#333',
    margin: '20px 0',
};

const footer = {
    color: '#666666',
    fontSize: '12px',
    textAlign: 'center' as const,
    marginTop: '32px',
};
