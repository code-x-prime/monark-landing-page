import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Registration Form',
    description: 'Register for Monark FX trading education courses. Join INST. ADVANCE TRADING (IAT) and Alpha Currency Trader (ACT) programs. Professional forex and stock market education.',
    keywords: [
        'registration',
        'trading course registration',
        'forex course registration',
        'Monark FX registration',
        'IAT course',
        'ACT course',
        'trading education registration'
    ],
    openGraph: {
        title: 'Registration Form | Monark FX',
        description: 'Register for Monark FX trading education courses. Join our professional trading programs.',
        url: 'https://monarkfx.com/registration',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Registration Form | Monark FX',
        description: 'Register for Monark FX trading education courses.',
    },
    alternates: {
        canonical: '/registration',
    },
};

export default function RegistrationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

