import { Shield, Target, BookOpen, Users } from 'lucide-react';

const trustPoints = [
    {
        icon: BookOpen,
        title: 'Professional Education',
        description: 'Structured curriculum designed by experienced traders with years of market expertise.',
    },
    {
        icon: Target,
        title: 'Strategy-First Approach',
        description: 'Learn proven strategies and develop your own trading system with discipline.',
    },
    {
        icon: Shield,
        title: 'Risk Management Focus',
        description: 'Master capital preservation and position sizing before chasing profits.',
    },
    {
        icon: Users,
        title: 'Long-Term Mindset',
        description: 'Build sustainable trading habits, not get-rich-quick schemes.',
    },
];

const TrustSection = () => {
    return (
        <section className="relative py-20 md:py-28">
            <div className="container px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">
                        About Monark FX
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        Trading Education Built on{' '}
                        <span className="text-gradient-red">Trust</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        We believe in transparent, professional trading education. No fake promises,
                        no unrealistic profit claims — just structured learning that builds real skills.
                    </p>
                </div>

                {/* Trust Points Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trustPoints.map((point, index) => (
                        <div
                            key={index}
                            className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 card-glow"
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <point.icon className="w-6 h-6 text-primary" />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-semibold mb-2 text-foreground">
                                {point.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {point.description}
                            </p>

                            {/* Hover accent */}
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
