'use client';
import dynamic from 'next/dynamic';

// Динамический импорт для отключения SSR
const Canvas = dynamic(() => import('../components/Canvas'), { ssr: false });

const Home = () => {
  return (
    <div>
      <h1>My Drawing Board</h1>
      <Canvas />
    </div>
  );
};

export default Home;
