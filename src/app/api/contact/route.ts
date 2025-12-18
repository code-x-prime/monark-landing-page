import { NextResponse } from 'next/server';
import { sendOtpEmail, getAdminEmailTemplate, getUserThankYouTemplate } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const { name, email, phone, message } = await request.json();

        // Validate required fields
        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: 'Name, email, and phone number are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const adminEmail = process.env.NEXT_PUBLIC_TO_EMAIL || process.env.NEXT_PUBLIC_FROM_EMAIL || 'service@monarkfx.com';
        const formData = { name, email, phone, message };

        // Send email to admin with inquiry details
        const adminEmailHtml = getAdminEmailTemplate(formData);
        const adminEmailText = `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message || 'No message provided'}`;

        await sendOtpEmail({
            to: adminEmail,
            subject: `New Contact Form Inquiry from ${name} - Monark FX`,
            text: adminEmailText,
            html: adminEmailHtml,
        });

        // Send thank you email to user
        const userEmailHtml = getUserThankYouTemplate({ name });
        const userEmailText = `Dear ${name},\n\nThank you for reaching out to Monark FX! We have successfully received your message and our team will review it shortly.\n\nWe understand the importance of your inquiry and will get back to you as soon as possible, typically within 24-48 hours.\n\nBest regards,\nMonark FX Team`;

        await sendOtpEmail({
            to: email,
            subject: 'Thank You for Contacting Monark FX - We Received Your Message',
            text: userEmailText,
            html: userEmailHtml,
        });

        return NextResponse.json({
            success: true,
            message: 'Contact form submitted successfully. Please check your email for confirmation.'
        });
    } catch (error: unknown) {
        console.error('Contact form error:', error);

        // Type guard for Error object
        const errorMessage = error instanceof Error
            ? error.message
            : 'Failed to send message. Please try again later.';

        const errorStack = error instanceof Error && process.env.NODE_ENV === 'development'
            ? error.stack
            : undefined;

        return NextResponse.json(
            {
                error: errorMessage,
                details: errorStack
            },
            { status: 500 }
        );
    }
}

