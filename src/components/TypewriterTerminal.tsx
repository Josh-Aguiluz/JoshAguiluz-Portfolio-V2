import React, { useState, useEffect } from 'react';

const phases = [
  '> Initializing System...',
  '> Loading Backend Architecture...',
  "> Josh_Aguiluz.exe Ready."
];

export default function TypewriterTerminal() {
  const [displayText, setDisplayText] = useState('');
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor (JS-driven so it keeps blinking even with OS animations turned off)
  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentText = phases[currentPhase];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentPhase((prev) => (prev + 1) % phases.length);
        }
      }, 30); // Deleting speed
    } else if (displayText.length === currentText.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }, 50); // Typing speed
    }

    return () => clearTimeout(timer);
  }, [displayText, currentPhase, isDeleting]);

  return (
    <p className="flex h-6 items-center font-mono text-sm text-fg">
      <span className="sr-only">{phases[phases.length - 1]}</span>
      <span aria-hidden="true" className="truncate">{displayText}</span>
      <span
        aria-hidden="true"
        className={`ml-0.5 inline-block h-4 w-2 shrink-0 bg-accent ${showCursor ? 'opacity-100' : 'opacity-0'}`}
      />
    </p>
  );
}
