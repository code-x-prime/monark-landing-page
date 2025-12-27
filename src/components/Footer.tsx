import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="relative py-12 md:py-16 border-t border-border bg-card/50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-12">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center ">
                            <Image
                                src="/logo-light.png"
                                alt="Monark FX Logo"
                                width={200}
                                height={200}
                                className="w-44 h-44 object-contain"
                                priority
                            />

                        </Link>
                        <p className="text-muted-foreground text-sm max-w-md mb-6 leading-relaxed">
                            Professional forex and stock market education platform.
                            Building disciplined traders through structured learning,
                            expert mentorship, and a focus on long-term success.
                        </p>
                    </div>


                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground leading-relaxed">
                                    Metro Pillar Number 654, Second floor B-28, Hari Nagar,
                                    B Block, JJ Colony, Uttam Nagar, New Delhi, Delhi, 110059
                                    <br />
                                    <span className="text-xs">(Near - Uttam Nagar East Metro Station)</span>
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                                <div className="text-sm text-muted-foreground">
                                    <a href="tel:+918750475852" className="hover:text-primary transition-colors">
                                        +91 87504 75852
                                    </a>
                                    {' / '}
                                    <a href="tel:+919220797499" className="hover:text-primary transition-colors">
                                        +91 9220797499
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                                <a
                                    href="mailto:service@monarkfx.com"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    service@monarkfx.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Monark FX. All rights reserved.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                        <Link href="/registration" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                            Registration
                        </Link>
                        <span className="text-muted-foreground hidden md:inline">•</span>
                        <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <span className="text-muted-foreground hidden md:inline">•</span>
                        <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                        <span className="text-muted-foreground hidden md:inline">•</span>
                        <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Disclaimer
                        </Link>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 p-4 rounded-lg bg-secondary/50 border border-border">
                    <p className="text-xs text-muted-foreground text-center leading-relaxed">
                        <strong className="text-foreground">Risk Disclaimer:</strong> Trading forex and stocks involves substantial risk of loss and is not suitable for all investors.
                        Past performance is not indicative of future results. Please trade responsibly and only with capital you can afford to lose.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
