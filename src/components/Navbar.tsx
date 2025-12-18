"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ['About', 'Features', 'Why Us', 'Contact'];

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
                    <a href="#" className="flex items-center">
                        <span className="text-xl md:text-2xl font-bold">
                            <span className="text-foreground">Monark</span>
                            <span className="text-primary"> FX</span>
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase().replace(' ', '-')}`}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Button variant="default" size="default">
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link}
                                </a>
                            ))}
                            <Button variant="default" size="default" className="mt-2">
                                Get Started
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
