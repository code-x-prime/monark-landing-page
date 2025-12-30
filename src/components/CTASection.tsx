"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ContactDialog from '@/components/ContactDialog';
import { ArrowRight, Zap, Phone } from 'lucide-react';

const CTASection = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <section className="relative py-20 md:py-28 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

            {/* Decorative glows */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 blur-[150px] rounded-full -translate-y-1/2" />
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary/10 blur-[150px] rounded-full -translate-y-1/2" />

            <div className="container px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Main CTA Card */}
                    <div className="relative p-8 md:p-12 lg:p-16 rounded-3xl bg-card border border-border overflow-hidden">
                        {/* Top accent */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                        {/* Corner decorations */}
                        <div className="absolute top-4 right-4 w-20 h-20 border border-primary/20 rounded-full opacity-30" />
                        <div className="absolute bottom-4 left-4 w-32 h-32 border border-primary/10 rounded-full opacity-20" />

                        <div className="relative z-10 text-center">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/30">
                                <Zap className="w-4 h-4 text-primary" />
                                <span className="text-sm font-semibold text-primary">Start Your Trading Journey</span>
                            </div>

                            {/* Headline */}
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                Ready to Trade with{' '}
                                <span className="text-gradient-red">Confidence</span>?
                            </h2>

                            {/* Subtext */}
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                                Join hundreds of traders who have transformed their approach to the markets.
                                Start your professional trading education today.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button variant="hero" size="xl" onClick={() => setIsDialogOpen(true)}>
                                    Get Started Now
                                    <ArrowRight className="w-5 h-5 ml-1" />
                                </Button>
                                <Button
                                    variant="heroOutline"
                                    size="xl"
                                    onClick={() => window.location.href = 'tel:+919220797499'}
                                >
                                    <Phone className="w-5 h-5 mr-2" />
                                    Call Now
                                </Button>
                            </div>

                            <ContactDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

                            {/* Trust note */}
                            <p className="text-sm text-muted-foreground mt-8">
                                No credit card required • Start learning immediately
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
