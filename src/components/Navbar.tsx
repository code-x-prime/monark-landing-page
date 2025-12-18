"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ContactDialog from '@/components/ContactDialog';
import Link from 'next/link';

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
                    <Link href="/" className="flex items-center">
                        <span className="text-xl md:text-2xl font-bold">
                            <span className="text-foreground">Monark</span>
                            <span className="text-primary"> FX</span>
                        </span>
                    </Link>



                    {/* CTA Button */}
                    <div >
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
