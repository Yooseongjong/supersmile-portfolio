import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactEmail from '@/components/emails/ContactEmail';

// Initialize Resend
// NOTE: You will need to add RESEND_API_KEY to your .env.local file
const apiKey = process.env.RESEND_API_KEY || 're_KpXepsF7_MmyaJNgu9ajMX1dY4ntWiHyA';
const resend = new Resend(apiKey);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validation on server side
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check for API Key
        if (!apiKey) {
            console.error('RESEND_API_KEY is missing');
            return NextResponse.json(
                { error: 'Server configuration error (Missing API Key)' },
                { status: 500 }
            );
        }

        const data = await resend.emails.send({
            from: 'SuperSmile Contact <onboarding@resend.dev>', // Default Resend Testing Domain
            to: ['haha3418@nate.com'], // User provided email
            subject: `New Inquiry from ${name}`,
            react: ContactEmail({ name, email, message }),
        });

        if (data.error) {
            console.error('Resend Error:', data.error);
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
