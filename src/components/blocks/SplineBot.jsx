'use client'; 
import Spline from '@splinetool/react-spline'; 

export default function SplineBot() {
  return (
    <main className='mt-20' style={{ width: '100vw', height: '100vh', zIndex:1 }}>
      <Spline
        scene="https://prod.spline.design/zbmUyelHybV5eiPU/scene.splinecode"
      />
    </main>
  );
}