import { Button } from '@/components/ui/button';
import CandlestickBackground from '@/components/CandlestickBackground';
import TickerBar from '@/components/TickerBar';
import { ArrowRight, TrendingUp } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
            <div className="absolute inset-0 bg-hero-gradient" />
            <CandlestickBackground />

            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />

            {/* Top red glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full" />

            {/* Content */}
            <div className="container relative z-10 px-4 py-20 md:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-border bg-secondary/50 backdrop-blur-sm animate-fade-in">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">
                            Professional Trading Education
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
                        Master the Markets with{' '}
                        <span className="text-gradient-red">Discipline</span>
                        <br />
                        <span className="text-muted-foreground">& Strategy</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Join Monark FX for structured forex education, expert mentorship, and a community
                        focused on long-term trading success. No hype — just real skills.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Button variant="hero" size="xl">
                            Get Started
                            <ArrowRight className="w-5 h-5 ml-1" />
                        </Button>
                        <Button variant="heroOutline" size="xl">
                            Join Now
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-foreground">500+</p>
                            <p className="text-sm text-muted-foreground mt-1">Active Students</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-foreground">50+</p>
                            <p className="text-sm text-muted-foreground mt-1">Expert Sessions</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-foreground">4.9</p>
                            <p className="text-sm text-muted-foreground mt-1">Student Rating</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ticker Bar */}
            <TickerBar />

            {/* Bottom fade */}
            <div className="absolute bottom-12 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
};

export default HeroSection;
