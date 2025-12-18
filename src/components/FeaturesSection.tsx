import { TrendingUp, GraduationCap, Headphones, Users2 } from 'lucide-react';

const features = [
    {
        icon: TrendingUp,
        title: 'Live Market Guidance',
        description: 'Real-time analysis and trade setups during market hours with expert commentary.',
        highlight: 'Daily Sessions',
    },
    {
        icon: GraduationCap,
        title: 'Structured Forex Learning',
        description: 'From basics to advanced strategies — a complete curriculum for all skill levels.',
        highlight: 'Full Curriculum',
    },
    {
        icon: Headphones,
        title: 'Expert Mentorship',
        description: 'One-on-one guidance from professional traders who understand the markets.',
        highlight: 'Personal Support',
    },
    {
        icon: Users2,
        title: 'Community Support',
        description: 'Join a focused community of traders sharing insights and growing together.',
        highlight: 'Active Community',
    },
];

const FeaturesSection = () => {
    return (
        <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-card/30 to-background">
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 blur-[100px] rounded-full -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-72 h-72 bg-primary/5 blur-[100px] rounded-full -translate-y-1/2" />

            <div className="container px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">
                        What You Get
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        Everything You Need to{' '}
                        <span className="text-gradient-red">Succeed</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Comprehensive resources designed to transform you into a confident,
                        disciplined trader.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-2xl bg-card-gradient border border-border hover:border-primary/40 transition-all duration-500 overflow-hidden"
                        >
                            {/* Background glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Top accent line */}
                            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                            <div className="relative z-10">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
                                        <feature.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                        {feature.highlight}
                                    </span>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Corner decoration */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
