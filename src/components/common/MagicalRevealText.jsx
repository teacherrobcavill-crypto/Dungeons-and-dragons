import React, { useState, useEffect, useRef } from 'react';

/**
 * MagicalRevealText - Enchanted word-by-word real-time ink reveal
 * Simulates a magical scrying or glowing quill writing outcomes onto the parchment in real time.
 */
export default function MagicalRevealText({
    text = '',
    speed = 50, // ms per word
    isNew = true,
    onComplete,
    className = ''
}) {
    // Strip any markdown asterisks or formatting symbols
    const cleaned = (text || '').replace(/[*_]/g, '');
    const tokens = cleaned.split(/(\s+)/); // Preserves spacing tokens

    const [revealedCount, setRevealedCount] = useState(isNew ? 0 : tokens.length);
    const [isComplete, setIsComplete] = useState(!isNew);
    const completedRef = useRef(false);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

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
            if (index >= tokens.length) {
                clearInterval(timer);
                setIsComplete(true);
                completedRef.current = true;
                if (onCompleteRef.current) onCompleteRef.current();
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, isNew, speed, tokens.length]);

    const handleSkip = () => {
        if (!completedRef.current) {
            setRevealedCount(tokens.length);
            setIsComplete(true);
            completedRef.current = true;
            if (onCompleteRef.current) onCompleteRef.current();
        }
    };

    const visibleText = isComplete ? cleaned : tokens.slice(0, revealedCount).join('');

    return (
        <span
            onClick={handleSkip}
            className={`relative inline select-text ${!isComplete ? 'cursor-pointer' : ''} ${className}`}
            title={!isComplete ? 'Click to reveal instantly' : undefined}
        >
            <span>{visibleText}</span>
            {!isComplete && (
                <span className="inline-block ml-1 text-amber-500 dark:text-cyan-400 font-bold animate-pulse text-xs select-none">
                    ✦
                </span>
            )}
        </span>
    );
}
