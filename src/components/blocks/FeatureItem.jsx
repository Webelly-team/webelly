import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { cn } from "@/lib/utils";

const FeatureItem = ({ feature, index, currentFeature, setCurrentFeature, setProgress }) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { amount: 0.3, once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, x: 0, transition: { duration: 0.6, delay: index * 0.1, ease: "easeOut" } });
    } else {
      controls.start({ opacity: 0, x: -50, transition: { duration: 0.6, delay: index * 0.1, ease: "easeOut" } });
    }
  }, [isInView, controls, index]);

  return (
    <motion.div
      key={index} 
      ref={itemRef}
      initial={{ opacity: 0, x: -50 }}
      animate={controls}
      onClick={() => {
        setCurrentFeature(index);
        setProgress(0);
      }}
      className="flex items-center gap-6 md:gap-8"
    >
      <motion.div
        className={cn(
          "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2",
          index === currentFeature
            ? "bg-primary border-primary text-primary-foreground scale-110"
            : "bg-muted border-muted-foreground"
        )}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: index === currentFeature ? 1.1 : 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {index <= currentFeature ? (
          <span className="text-lg font-bold">✓</span>
        ) : (
          <span className="text-lg font-semibold">{index + 1}</span>
        )}
      </motion.div>

      <div className="flex-1">
        <h3 className="text-xl md:text-2xl font-semibold text-white">
          {feature.title || feature.step}
        </h3>
        <p className="text-sm md:text-lg text-neutral-400">
          {feature.content}
        </p>
      </div>
    </motion.div>
  );
};

export default FeatureItem;