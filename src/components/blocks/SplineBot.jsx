'use client'; 
import Spline from '@splinetool/react-spline'; 
import { useEffect, useState } from 'react';

export default function SplineBot() {
  const [width, setwidth] = useState(1000)
  useEffect(()=>{
    const width = window.innerWidth;
    console.log(width)
    setwidth(width)
  },[])
  return (
    <main className='mt-20 hidden md:flex' style={{ width: '100vw', height: '100vh', zIndex:1 }}>
      {
        width>470 && 
        <Spline
        scene="https://prod.spline.design/zbmUyelHybV5eiPU/scene.splinecode"
      />}
    </main>
  );
}