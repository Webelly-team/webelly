// components/ui/Navbar.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react'; 
import { cn } from '@/lib/utils';

const Navbar = ({ links, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { 
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavLinkClick = (href) => {
    setIsOpen(false); // Close menu on link click
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300",
        "bg-white/10 backdrop-blur-lg border border-white/[0.2] shadow-xl", // Glassmorphism
        isScrolled ? "py-2 px-5" : "py-3 px-6", // Subtle shrink on scroll
        className
      )}
    >
      {/* Logo/Brand Name */}
      <Link href="#home" className="text-xl font-bold text-white tracking-wider hover:text-blue-400 transition-colors">
        Webelly
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-6">
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            onClick={() => handleNavLinkClick(link.href)}
            className="text-neutral-300 hover:text-white transition-colors text-lg font-medium relative group"
          >
            {link.title}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button (Hamburger) */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-black/80 backdrop-blur-lg border-b border-white/[0.2] md:hidden flex flex-col items-center py-4 space-y-4 rounded-b-lg shadow-lg"
          >
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                onClick={() => handleNavLinkClick(link.href)}
                className="text-white text-lg font-medium hover:text-blue-400 transition-colors w-full text-center py-2"
              >
                {link.title}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;