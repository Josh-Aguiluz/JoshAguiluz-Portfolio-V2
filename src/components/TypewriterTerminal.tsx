import React, { useState, useEffect } from 'react';

export default function TypewriterTerminal() {
  const [displayText, setDisplayText] = useState('');
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const [isDeleting, setIsDeleting] = useState(false);

  const phases = [
    '> Initializing System...',
    '> Loading Backend Architecture...',
    "> Josh_Aguiluz.exe Ready."
  ];

  useEffect(() => {
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentText = phases[currentPhase];

    if (isDeleting) {
      // Deleting text
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentPhase((prev) => (prev + 1) % phases.length);
        }
      }, 30); // Deleting speed
    } else {
      // Typing text
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        if (displayText.length === currentText.length) {
          // Pause before deleting
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, 2000); // Wait 2s before deleting
        }
      }, 50); // Typing speed
    }

    return () => clearTimeout(timer);
  }, [displayText, currentPhase, isDeleting]);

  return (
    <div className="font-mono text-[18px] md:text-[20px] text-[#521D07] dark:text-[#A47A2D] mt-6">
      <span>{displayText}</span>
      <span className={`inline-block w-2 h-5 bg-[#521D07] dark:bg-[#A47A2D] ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
        {showCursor ? '█' : ''}
      </span>
    </div>
  );
}
