import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
    html: string;
}

interface FormData {
    name: string;
    email: string;
    phone?: string;
    message?: string;
}

// Create transporter
const createTransporter = () => {
    // Get credentials with proper fallback - check all possible variable names
    // Priority: NEXT_PUBLIC_ variables first (for client-side access), then server-side only
    const smtpUser = process.env.NEXT_PUBLIC_SMTP_USER
        || process.env.SMTP_USER
        || process.env.BREVO_SMTP_USER
        || process.env.NEXT_PUBLIC_FROM_EMAIL
        || process.env.FROM_EMAIL
        || process.env.EMAIL_USER;

    const smtpPassword = process.env.NEXT_PUBLIC_SMTP_PASSWORD
        || process.env.SMTP_PASSWORD
        || process.env.BREVO_SMTP_KEY
        || process.env.BREVO_API_KEY
        || process.env.SMTP_APP_PASSWORD
        || process.env.EMAIL_PASSWORD
        || process.env.GMAIL_APP_PASSWORD;

    // Brevo SMTP settings (default) or custom
    const smtpHost = process.env.NEXT_PUBLIC_SMTP_HOST
        || process.env.SMTP_HOST
        || process.env.BREVO_SMTP_HOST
        || 'smtp-relay.brevo.com';
    const smtpPort = parseInt(
        process.env.NEXT_PUBLIC_SMTP_PORT
        || process.env.SMTP_PORT
        || process.env.BREVO_SMTP_PORT
        || '587'
    );


    // Validate credentials
    if (!smtpUser || !smtpPassword) {
        const errorMsg = `SMTP credentials missing. Please check your .env.local file.\n` +
            `\nFor Brevo (Sendinblue), use these variable names:\n` +
            `  NEXT_PUBLIC_SMTP_USER=your-brevo-smtp-user\n` +
            `  NEXT_PUBLIC_SMTP_PASSWORD=your-brevo-api-key\n` +
            `  NEXT_PUBLIC_SMTP_HOST=smtp-relay.brevo.com\n` +
            `  NEXT_PUBLIC_SMTP_PORT=587\n` +
            `\nOr use without NEXT_PUBLIC_ prefix:\n` +
            `  SMTP_USER=your-brevo-smtp-user\n` +
            `  SMTP_PASSWORD=your-brevo-api-key\n` +
            `  SMTP_HOST=smtp-relay.brevo.com\n` +
            `  SMTP_PORT=587\n` +
            `\nCurrent status:\n` +
            `  - User: ${smtpUser ? 'SET' : 'MISSING'}\n` +
            `  - Password/API Key: ${smtpPassword ? 'SET' : 'MISSING'}\n` +
            `  - Host: ${smtpHost}\n` +
            `  - Port: ${smtpPort}\n` +
            `\nTroubleshooting:\n` +
            `1. Check .env.local file exists in project root\n` +
            `2. Variables format: VARIABLE_NAME=value (no quotes, no spaces)\n` +
            `3. Restart dev server completely after adding variables\n` +
            `4. Check console logs above for which variables are being read`;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }

    return nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: false, // true for 465, false for other ports
        auth: {
            user: smtpUser,
            pass: smtpPassword,
        },
    });
};

// Send email function
export async function sendOtpEmail({ to, subject, text, html }: EmailOptions) {
    const transporter = createTransporter();
    const fromEmail = process.env.NEXT_PUBLIC_FROM_EMAIL || process.env.SMTP_USER || 'noreply@monarkfx.com';
    const fromName = process.env.FROM_NAME || 'Monark FX';

    try {
        const info = await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to,
            subject,
            text,
            html,
        });

        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// Admin email template
export function getAdminEmailTemplate(formData: FormData): string {
    const logoUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monarkfx.com';
    const logoImageUrl = `${logoUrl.replace(/\/$/, '')}/logo.png`;
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Inquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a; color: #ffffff;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #dc2626; overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 30px; text-align: center;">
                            <div style="margin-bottom: 15px; text-align: center;">
                                <img src="${logoImageUrl}" alt="Monark FX Logo" width="60" height="60" style="width: 60px; height: 60px; max-width: 60px; display: block; margin: 0 auto; object-fit: contain;" />
                            </div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">New Contact Form Inquiry</h1>
                            <p style="margin: 10px 0 0 0; color: #ffffff; opacity: 0.9; font-size: 14px;">Monark FX - Trading Education Platform</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px 0; color: #e5e5e5; font-size: 16px; line-height: 1.6;">
                                You have received a new contact form submission from your website.
                            </p>
                            
                            <div style="background-color: #262626; border-left: 4px solid #dc2626; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 8px 0; color: #a3a3a3; font-size: 14px; width: 120px;"><strong>Name:</strong></td>
                                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 500;">${formData.name}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #a3a3a3; font-size: 14px;"><strong>Email:</strong></td>
                                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">
                                            <a href="mailto:${formData.email}" style="color: #dc2626; text-decoration: none;">${formData.email}</a>
                                        </td>
                                    </tr>
                                    ${formData.phone ? `
                                    <tr>
                                        <td style="padding: 8px 0; color: #a3a3a3; font-size: 14px;"><strong>Phone:</strong></td>
                                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">
                                            <a href="tel:${formData.phone}" style="color: #dc2626; text-decoration: none;">${formData.phone}</a>
                                        </td>
                                    </tr>
                                    ` : ''}
                                    ${formData.message ? `
                                    <tr>
                                        <td style="padding: 8px 0; color: #a3a3a3; font-size: 14px; vertical-align: top;"><strong>Message:</strong></td>
                                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; line-height: 1.6;">${formData.message.replace(/\n/g, '<br>')}</td>
                                    </tr>
                                    ` : ''}
                                </table>
                            </div>
                            
                            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #404040;">
                                <p style="margin: 0; color: #a3a3a3; font-size: 12px; text-align: center;">
                                    Submitted on ${new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #0f0f0f; padding: 20px 30px; text-align: center; border-top: 1px solid #404040;">
                            <p style="margin: 0; color: #737373; font-size: 12px;">
                                This is an automated email from <a href="https://monarkfx.com" style="color: #dc2626; text-decoration: none;">monarkfx.com</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}

// User thank you email template
export function getUserThankYouTemplate({ name }: { name: string }): string {
    const logoUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monarkfx.com';
    const logoImageUrl = `${logoUrl.replace(/\/$/, '')}/logo.png`;
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Contacting Monark FX</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a; color: #ffffff;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #dc2626; overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 40px 30px; text-align: center;">
                            <div style="margin-bottom: 20px; text-align: center;">
                                <img src="${logoImageUrl}" alt="Monark FX Logo" width="80" height="80" style="width: 80px; height: 80px; max-width: 80px; display: block; margin: 0 auto; object-fit: contain;" />
                            </div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">Thank You!</h1>
                            <p style="margin: 15px 0 0 0; color: #ffffff; opacity: 0.9; font-size: 18px;">Monark FX</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px 0; color: #e5e5e5; font-size: 18px; line-height: 1.6;">
                                Dear <strong style="color: #dc2626;">${name}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 20px 0; color: #e5e5e5; font-size: 16px; line-height: 1.8;">
                                Thank you for reaching out to <strong style="color: #ffffff;">Monark FX</strong>! We have successfully received your message and our team will review it shortly.
                            </p>
                            
                            <div style="background-color: #262626; border-left: 4px solid #dc2626; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <p style="margin: 0; color: #ffffff; font-size: 15px; line-height: 1.8;">
                                    We understand the importance of your inquiry and will get back to you as soon as possible, typically within <strong style="color: #dc2626;">24-48 hours</strong>.
                                </p>
                            </div>
                            
                            <p style="margin: 25px 0 0 0; color: #e5e5e5; font-size: 16px; line-height: 1.8;">
                                In the meantime, feel free to explore our trading education resources and join our community of disciplined traders.
                            </p>
                            
                            <div style="margin: 30px 0; text-align: center;">
                                <a href="https://monarkfx.com" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                                    Visit Our Website
                                </a>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #0f0f0f; padding: 30px; text-align: center; border-top: 1px solid #404040;">
                            <div style="margin-bottom: 15px; text-align: center;">
                                <img src="${logoImageUrl}" alt="Monark FX Logo" width="50" height="50" style="width: 50px; height: 50px; max-width: 50px; display: block; margin: 0 auto; object-fit: contain;" />
                            </div>
                            <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 16px; font-weight: 600;">Monark FX</p>
                            <p style="margin: 0 0 15px 0; color: #a3a3a3; font-size: 14px; line-height: 1.6;">
                                Professional Trading Education Platform<br>
                                Master the Markets with Discipline & Strategy
                            </p>
                            <div style="margin: 20px 0 0 0; padding-top: 20px; border-top: 1px solid #404040;">
                                <p style="margin: 0 0 8px 0; color: #737373; font-size: 12px;">
                                    <strong>Contact Us:</strong><br>
                                    <a href="mailto:service@monarkfx.com" style="color: #dc2626; text-decoration: none;">service@monarkfx.com</a><br>
                                    <a href="tel:+918750475852" style="color: #dc2626; text-decoration: none;">+91 87504 75852</a> / 
                                    <a href="tel:+919220797499" style="color: #dc2626; text-decoration: none;">+91 9220797499</a>
                                </p>
                                <p style="margin: 15px 0 0 0; color: #737373; font-size: 11px;">
                                    © ${new Date().getFullYear()} Monark FX. All rights reserved.
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}

