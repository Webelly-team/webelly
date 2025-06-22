// components/BentoGrid.jsx
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
export const BentoGrid = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  imgSrc,
  link,
  icon
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 relative overflow-hidden",
        className
      )}
    >
      {imgSrc && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imgSrc}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg opacity-50 group-hover/bento:opacity-75 transition duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 rounded-lg"></div> {/* Dark overlay */}
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col p-2">
        {icon && <div className="flex justify-end mb-2">{icon}</div>} {/* Icon in top right */}
        <div className="font-sans font-bold text-neutral-200 text-lg group-hover/bento:translate-x-2 transition duration-200">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-400 text-sm mt-2">
          {description}
        </div>
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 self-end mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors duration-200"
        >
          View Project
        </a>
      )}
    </div>
  );
};