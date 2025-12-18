"use client";

const tickers = [
    { symbol: 'EUR/USD', price: '1.0892', change: '+0.15%', up: true },
    { symbol: 'GBP/USD', price: '1.2654', change: '-0.08%', up: false },
    { symbol: 'USD/JPY', price: '149.85', change: '+0.22%', up: true },
    { symbol: 'XAU/USD', price: '2,032.50', change: '+0.45%', up: true },
    { symbol: 'BTC/USD', price: '42,850', change: '-1.20%', up: false },
    { symbol: 'USD/CHF', price: '0.8745', change: '+0.12%', up: true },
    { symbol: 'AUD/USD', price: '0.6589', change: '-0.18%', up: false },
    { symbol: 'NZD/USD', price: '0.6125', change: '+0.05%', up: true },
];

const TickerBar = () => {
    // Double the tickers for seamless loop
    const allTickers = [...tickers, ...tickers];

    return (
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden bg-background/80 backdrop-blur-sm border-t border-border/30">
            <div className="flex animate-ticker whitespace-nowrap py-3">
                {allTickers.map((ticker, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 px-6 border-r border-border/20"
                    >
                        <span className="text-sm font-medium text-foreground">
                            {ticker.symbol}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {ticker.price}
                        </span>
                        <span
                            className={`text-xs font-medium ${ticker.up ? 'text-green-500' : 'text-primary'
                                }`}
                        >
                            {ticker.change}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TickerBar;
