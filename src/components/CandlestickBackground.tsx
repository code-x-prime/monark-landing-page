"use client";

import { useEffect, useRef } from 'react';

const CandlestickBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Generate candlestick data
        const candlesticks: Array<{
            x: number;
            open: number;
            close: number;
            high: number;
            low: number;
            isGreen: boolean;
        }> = [];

        const candleWidth = 16;
        const gap = 10;
        const candleSpacing = candleWidth + gap;

        const generateCandlesticks = () => {
            candlesticks.length = 0;
            // Generate enough candles to cover screen width + extra for seamless loop
            const totalCandles = Math.ceil((canvas.width * 2.5) / candleSpacing) + 20;
            let basePrice = canvas.height * 0.5;

            for (let i = 0; i < totalCandles; i++) {
                const volatility = Math.random() * 80 + 30;
                const change = (Math.random() - 0.5) * 40;
                basePrice = Math.max(100, Math.min(canvas.height - 100, basePrice + change));

                const open = basePrice + (Math.random() - 0.5) * volatility;
                const close = basePrice + (Math.random() - 0.5) * volatility;
                const isGreen = close > open;
                const high = Math.max(open, close) + Math.random() * 30;
                const low = Math.min(open, close) - Math.random() * 30;

                candlesticks.push({
                    x: i * candleSpacing,
                    open,
                    close,
                    high,
                    low,
                    isGreen,
                });
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Regenerate candlesticks on resize for responsive behavior
            generateCandlesticks();
        };
        resize();
        window.addEventListener('resize', resize);

        generateCandlesticks();

        let offset = 0;
        const speed = 0.3; // Slower for smoother effect
        let lastTime = 0;
        let animationId: number;

        const draw = (currentTime: number) => {
            // Calculate delta time for smooth animation
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;

            // Use consistent frame rate (60fps target)
            const frameTime = 16.67; // ~60fps
            const normalizedDelta = Math.min(deltaTime / frameTime, 2); // Cap at 2x speed

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid lines
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
            ctx.lineWidth = 1;

            for (let i = 0; i < canvas.height; i += 50) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
            }

            for (let i = 0; i < canvas.width; i += 50) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
            }

            // Draw candlesticks
            candlesticks.forEach((candle, index) => {
                const x = candle.x - offset;
                // Only draw visible candles with buffer
                if (x < -candleWidth || x > canvas.width + candleWidth) return;

                const redColor = 'rgba(211, 47, 47, 0.4)';
                const greenColor = 'rgba(76, 175, 80, 0.3)';
                const wickColor = candle.isGreen ? 'rgba(76, 175, 80, 0.25)' : 'rgba(211, 47, 47, 0.3)';

                // Draw wick
                ctx.strokeStyle = wickColor;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x + candleWidth / 2, candle.high);
                ctx.lineTo(x + candleWidth / 2, candle.low);
                ctx.stroke();

                // Draw body
                const bodyTop = Math.min(candle.open, candle.close);
                const bodyHeight = Math.abs(candle.close - candle.open);

                ctx.fillStyle = candle.isGreen ? greenColor : redColor;
                ctx.fillRect(x, bodyTop, candleWidth, Math.max(bodyHeight, 3));

                // Add glow effect for some candles
                if (index % 3 === 0) {
                    ctx.shadowColor = candle.isGreen ? 'rgba(76, 175, 80, 0.3)' : 'rgba(211, 47, 47, 0.4)';
                    ctx.shadowBlur = 15;
                    ctx.fillRect(x, bodyTop, candleWidth, Math.max(bodyHeight, 3));
                    ctx.shadowBlur = 0;
                }
            });

            // Draw a subtle price line
            ctx.strokeStyle = 'rgba(211, 47, 47, 0.15)';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();

            let pathStarted = false;
            candlesticks.forEach((candle) => {
                const x = candle.x - offset;
                if (x >= -candleWidth && x <= canvas.width + candleWidth) {
                    if (!pathStarted) {
                        ctx.moveTo(x, candle.close);
                        pathStarted = true;
                    } else {
                        ctx.lineTo(x + candleWidth / 2, candle.close);
                    }
                }
            });
            ctx.stroke();
            ctx.setLineDash([]);

            // Update offset for smooth scrolling with delta time
            offset += speed * normalizedDelta;

            // Keep enough candles on screen
            const maxX = Math.max(...candlesticks.map(c => c.x));
            const minX = Math.min(...candlesticks.map(c => c.x));

            // Remove candles that are far off-screen left
            while (candlesticks.length > 0 && candlesticks[0].x - offset < -candleWidth * 3) {
                candlesticks.shift();
            }

            // Add new candles on the right when needed
            const lastCandle = candlesticks[candlesticks.length - 1];
            if (lastCandle && (maxX - offset) < canvas.width + candleWidth * 5) {
                const neededCandles = Math.ceil((canvas.width - (maxX - offset)) / candleSpacing) + 10;

                let currentPrice = lastCandle.close;
                for (let i = 0; i < neededCandles; i++) {
                    const volatility = Math.random() * 80 + 30;
                    const change = (Math.random() - 0.5) * 40;
                    currentPrice = Math.max(100, Math.min(canvas.height - 100, currentPrice + change));

                    const open = currentPrice + (Math.random() - 0.5) * volatility;
                    const close = currentPrice + (Math.random() - 0.5) * volatility;
                    const isGreen = close > open;

                    candlesticks.push({
                        x: maxX + (i + 1) * candleSpacing,
                        open,
                        close,
                        high: Math.max(open, close) + Math.random() * 30,
                        low: Math.min(open, close) - Math.random() * 30,
                        isGreen,
                    });
                }
            }

            animationId = requestAnimationFrame(draw);
        };

        // Start the animation with timestamp
        lastTime = performance.now();
        animationId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resize);
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
            style={{
                filter: 'blur(1px)',
                willChange: 'transform',
                transform: 'translateZ(0)'
            }}
        />
    );
};

export default CandlestickBackground;
