import { Check, X } from 'lucide-react';

const comparisons = [
    {
        us: 'Structured, curriculum-based learning',
        others: 'Random tips and signals',
    },
    {
        us: 'Focus on risk management first',
        others: 'Chase high returns blindly',
    },
    {
        us: 'Build long-term trading skills',
        others: 'Promise quick riches',
    },
    {
        us: 'Transparent and realistic expectations',
        others: 'Show fake profit screenshots',
    },
    {
        us: 'Personal mentorship support',
        others: 'One-size-fits-all approach',
    },
];

const WhyChooseSection = () => {
    return (
        <section className="relative py-20 md:py-28">
            <div className="container px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">
                        Why Monark FX
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        The{' '}
                        <span className="text-gradient-red">Professional</span>{' '}
                        Difference
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        See how Monark FX stands apart from typical trading courses and signal groups.
                    </p>
                </div>

                {/* Comparison Table */}
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="grid grid-cols-2 gap-2 md:gap-4 mb-6">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/30">
                                <span className="text-lg font-bold text-primary">Monark FX</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary border border-border">
                                <span className="text-lg font-bold text-muted-foreground">Others</span>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Rows */}
                    <div className="space-y-3">
                        {comparisons.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-2 gap-2 md:gap-4"
                            >
                                {/* Us */}
                                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group">
                                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-green-500" />
                                    </div>
                                    <span className="text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                                        {item.us}
                                    </span>
                                </div>

                                {/* Others */}
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border/50">
                                    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                        <X className="w-4 h-4 text-red-400" />
                                    </div>
                                    <span className="text-sm md:text-base text-muted-foreground">
                                        {item.others}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;
