import { NextResponse } from 'next/server';
import { sendOtpEmail, getRegistrationAdminTemplate, getUserThankYouTemplate } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const formData = await request.json();

        // Validate required fields
        if (!formData.fullName || !formData.email || !formData.mobNumber) {
            return NextResponse.json(
                { error: 'Full Name, Email, and Mobile Number are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const adminEmail = process.env.TO_EMAIL
            || process.env.NEXT_PUBLIC_TO_EMAIL
            || process.env.FROM_EMAIL
            || process.env.NEXT_PUBLIC_FROM_EMAIL
            || 'service@monarkfx.com';

        console.log('Sending registration emails...');
        console.log('Admin email:', adminEmail);
        console.log('User email:', formData.email);

        // Send email to admin with registration details
        const adminEmailHtml = getRegistrationAdminTemplate(formData);
        const adminEmailText = `New Registration Form Submission\n\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.mobNumber}\n\nSee full details in HTML email.`;

        try {
            const adminResult = await sendOtpEmail({
                to: adminEmail,
                subject: `New Registration: ${formData.fullName} - Monark FX`,
                text: adminEmailText,
                html: adminEmailHtml,
            });
            console.log('Admin email sent:', adminResult);
        } catch (adminError) {
            console.error('Failed to send admin email:', adminError);
            throw new Error(`Failed to send admin email: ${adminError instanceof Error ? adminError.message : 'Unknown error'}`);
        }

        // Send thank you email to user
        const userEmailHtml = getUserThankYouTemplate({ name: formData.fullName });
        const userEmailText = `Dear ${formData.fullName},\n\nThank you for registering with Monark FX! We have successfully received your registration and our team will review it shortly.\n\nWe will get back to you as soon as possible, typically within 24-48 hours.\n\nBest regards,\nMonark FX Team`;

        try {
            const userResult = await sendOtpEmail({
                to: formData.email,
                subject: 'Thank You for Registering with Monark FX',
                text: userEmailText,
                html: userEmailHtml,
            });
            console.log('User email sent:', userResult);
        } catch (userError) {
            console.error('Failed to send user email:', userError);
            console.warn('User email failed but continuing...');
        }

        return NextResponse.json({
            success: true,
            message: 'Registration submitted successfully. Please check your email for confirmation.'
        });
    } catch (error: unknown) {
        console.error('Registration form error:', error);

        const errorMessage = error instanceof Error
            ? error.message
            : 'Failed to submit registration. Please try again later.';

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

