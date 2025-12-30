"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ContactDialog from '@/components/ContactDialog';
import Link from 'next/link';
import Image from 'next/image';
import { Phone } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-background/90 backdrop-blur-lg border-b border-border'
                : 'bg-transparent'
                }`}
        >
            <div className="container px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="md:flex hidden items-center gap-3">
                        <Image
                            src="/logo-light.png"
                            alt="Monark FX Logo"
                            width={200}
                            height={200}
                            className="w-20 h-20 md:w-44 md:h-44 object-contain"
                            priority
                        />

                    </Link>
                    <Link href="/" className="flex md:hidden items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="Monark FX Logo"
                            width={200}
                            height={200}
                            className="w-20 h-20   object-cover p-2"
                            priority
                        />

                    </Link>



                    {/* CTA Button */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="default"
                            className="hidden md:flex items-center gap-2"
                            onClick={() => window.location.href = 'tel:+919220797499'}
                        >
                            <Phone className="w-4 h-4" />
                            Call Now
                        </Button>
                        <Button variant="default" size="default" onClick={() => setIsDialogOpen(true)}>
                            Get Started
                        </Button>
                    </div>

                </div>

                <ContactDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            </div>
        </nav>
    );
};

export default Navbar;
