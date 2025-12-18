import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative py-12 md:py-16 border-t border-border bg-card/50">
            <div className="container px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold mb-4">
                            <span className="text-foreground">Monark</span>
                            <span className="text-primary"> FX</span>
                        </h3>
                        <p className="text-muted-foreground text-sm max-w-md mb-6 leading-relaxed">
                            Professional forex and stock market education platform.
                            Building disciplined traders through structured learning,
                            expert mentorship, and a focus on long-term success.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {['About Us', 'Courses', 'Mentorship', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
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
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Disclaimer
                        </a>
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
