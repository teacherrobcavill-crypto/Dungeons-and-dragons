import React, { useState, useEffect, useRef } from 'react';

/**
 * MagicalRevealText - Enchanted word-by-word real-time ink reveal
 * Simulates a magical scrying or glowing quill writing outcomes onto the parchment in real time.
 */
export default function MagicalRevealText({
    text = '',
    speed = 200, // ms per word (deliberate, theatrical storytelling cadence)
    isNew = true,
    autoScroll = true,
    onComplete,
    className = ''
}) {
    // Strip any markdown asterisks or formatting symbols
    const cleaned = (text || '').replace(/[*_]/g, '');
    // Tokenize into words with trailing whitespace (e.g. ["Kaelen ", "strikes ", "his ", "target."])
    const tokens = cleaned.match(/\S+\s*/g) || (cleaned ? [cleaned] : []);

    const [revealedCount, setRevealedCount] = useState(isNew ? 0 : tokens.length);
    const [isComplete, setIsComplete] = useState(!isNew);
    const completedRef = useRef(false);
    const onCompleteRef = useRef(onComplete);
    const containerRef = useRef(null);
    const cursorRef = useRef(null);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    // Initial smooth scroll when mounting a new revealing bubble
    useEffect(() => {
        if (!isNew || !autoScroll) return;
        const target = cursorRef.current || containerRef.current;
        target?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [isNew, autoScroll]);

    useEffect(() => {
        if (!isNew || tokens.length === 0) {
            setRevealedCount(tokens.length);
            setIsComplete(true);
            completedRef.current = true;
            return;
        }

        let index = 0;
        const timer = setInterval(() => {
            index += 1;
            setRevealedCount(index);

            // Auto-scroll as words appear so the player never has to touch the mouse or scroll wheel
            if (autoScroll && index % 2 === 0) {
                const target = cursorRef.current || containerRef.current;
                target?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            if (index >= tokens.length) {
                clearInterval(timer);
                setIsComplete(true);
                completedRef.current = true;
                if (onCompleteRef.current) onCompleteRef.current();
                if (autoScroll) {
                    const target = cursorRef.current || containerRef.current;
                    target?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, isNew, speed, tokens.length, autoScroll]);

    const handleSkip = () => {
        if (!completedRef.current) {
            setRevealedCount(tokens.length);
            setIsComplete(true);
            completedRef.current = true;
            if (onCompleteRef.current) onCompleteRef.current();
            if (autoScroll) {
                containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    };

    const visibleText = isComplete ? cleaned : tokens.slice(0, revealedCount).join('');

    return (
        <span
            ref={containerRef}
            onClick={handleSkip}
            className={`relative inline select-text ${!isComplete ? 'cursor-pointer' : ''} ${className}`}
            title={!isComplete ? 'Click to reveal instantly' : undefined}
        >
            <span>{visibleText}</span>
            {!isComplete && (
                <span
                    ref={cursorRef}
                    className="inline-block ml-1.5 text-amber-500 dark:text-cyan-400 font-bold animate-pulse text-xs select-none"
                >
                    ✦
                </span>
            )}
        </span>
    );
}
