'use client';
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useAnimation } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LayoutGroup } from "framer-motion";
import { TextRotate } from "@/components/ui/text-rotate";
import FeatureItem from './FeatureItem'; 

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000,
  imageHeight = "h-[400px]"
}) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress, features.length, autoPlayInterval]);

  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { amount: 0.5, once: false });
  const titleControls = useAnimation();

  useEffect(() => {
    if (titleInView) {
      titleControls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } });
    } else {
      titleControls.start({ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeOut" } });
    }
  }, [titleInView, titleControls]);


  const imageColRef = useRef(null);
  const imageColInView = useInView(imageColRef, { amount: 0.3, once: false });
  const imageColControls = useAnimation();

  useEffect(() => {
    if (imageColInView) {
      imageColControls.start({ opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } });
    } else {
      imageColControls.start({ opacity: 0, x: 50, transition: { duration: 0.8, ease: "easeOut" } });
    }
  }, [imageColInView, imageColControls]);
  const textRotateRef = useRef(null);
  const textRotateInView = useInView(textRotateRef, { amount: 0.5, once: false });
  const textRotateControls = useAnimation();

  useEffect(() => {
    if (textRotateInView) {
      textRotateControls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } });
    } else {
      textRotateControls.start({ opacity: 0, y: 50, transition: { duration: 0.8, ease: "easeOut" } });
    }
  }, [textRotateInView, textRotateControls]);


  return (
    <div className={cn("p-8 md:p-12", className)}>
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: -50 }}
          animate={titleControls}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center text-white"
        >
          {title}
        </motion.h2>

        <div className="flex flex-col md:grid md:grid-cols-2 mt-40 gap-6 md:gap-10">
          <div className="order-2 md:order-1 space-y-8">
            {features.map((feature, index) => (
              <FeatureItem
                key={index} 
                feature={feature}
                index={index}
                currentFeature={currentFeature}
                setCurrentFeature={setCurrentFeature}
                setProgress={setProgress}
              />
            ))}

            <motion.div
              ref={textRotateRef}
              initial={{ opacity: 0, y: 50 }}
              animate={textRotateControls}
              className="mt-12 w-full text-2xl sm:text-3xl md:text-4xl flex flex-row items-center justify-start
                         font-overusedGrotesk  text-muted bg-transparent font-light overflow-hidden p-6 sm:p-8 md:p-10 rounded-lg
                         md:w-[calc(100%-40px)] md:ml-auto md:mr-0 lg:text-5xl"
            >
              <LayoutGroup>
                <motion.div className="flex whitespace-pre" layout>
                  <motion.span
                    className="pt-0.5 sm:pt-1 md:pt-2"
                    layout
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  >
                    Make it{" "}
                  </motion.span>
                  <TextRotate
                    texts={[
                      "work!",
                      "fancy ✽",
                      "right",
                      "fast",
                      "fun",
                      "rock",
                      "🕶️🕶️🕶️",
                    ]}
                    mainClassName="text-white px-2 sm:px-2 md:px-3 bg-[#fff] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 text-black sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                </motion.div>
              </LayoutGroup>
            </motion.div>
          </div>

          <motion.div
            ref={imageColRef}
            initial={{ opacity: 0, x: 50 }}
            animate={imageColControls}
            className={cn(
              "order-1 md:order-2 relative h-[700px] md:h-[700px] lg:h-[800px] overflow-hidden rounded-lg",
              imageHeight
            )}
          >
            <AnimatePresence mode="wait">
              {features.map((feature, index) =>
                index === currentFeature && (
                  <motion.div
                    key={index}
                    className="absolute inset-0 rounded-lg overflow-hidden"
                    initial={{ y: 100, opacity: 0, rotateX: -20 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -100, opacity: 0, rotateX: 20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {feature.image && (
                      <Image
                        src={feature.image}
                        alt={feature.step}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={index === 0}
                      />
                    )}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}