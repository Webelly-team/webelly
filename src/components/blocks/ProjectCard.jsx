// components/ui/ProjectCard.jsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const ProjectCard = ({ project, cursorY }) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [cardOffsetTop, setCardOffsetTop] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);

  // State to hold the calculated float effect
  const [floatEffect, setFloatEffect] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      setCardOffsetTop(cardRef.current.offsetTop);
      setCardHeight(cardRef.current.offsetHeight);
    }
    // Recalculate if window resizes
    const handleResize = () => {
      if (cardRef.current) {
        setCardOffsetTop(cardRef.current.offsetTop);
        setCardHeight(cardRef.current.offsetHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Recalculate floatEffect whenever cursorY, cardOffsetTop, or cardHeight changes
  useEffect(() => {
    const cardCenterY = cardOffsetTop + cardHeight / 2;
    const distanceFromCenter = cursorY - cardCenterY;

    // Adjust multiplier for intensity and direction.
    // If cursorY is high (top of screen), distanceFromCenter is negative, so floatEffect is positive (move down)
    // If cursorY is low (bottom of screen), distanceFromCenter is positive, so floatEffect is negative (move up)
    const newFloatEffect = distanceFromCenter * -0.05; // Adjust multiplier for intensity and direction
    setFloatEffect(newFloatEffect); // Update the state
  }, [cursorY, cardOffsetTop, cardHeight]); // Dependencies for this effect

  return (
    <motion.div
      ref={cardRef}
      className="relative w-72 h-60 rounded-lg overflow-hidden shadow-lg m-4 transform transition-transform duration-100 ease-out"
      style={{
        transform: `translateY(${floatEffect}px)`, // Now floatEffect is a state variable
        perspective: '1000px', // For potential future 3D transforms
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-full object-cover"
      />
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center p-4 text-center"
          >
            <h3 className="text-white text-xl font-bold mb-3">{project.name}</h3>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 shadow-md"
              >
                Live URL
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectCard;