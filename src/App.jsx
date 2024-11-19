import { Link } from '@nextui-org/react';
import './App.css';
import CatImage from './components/CatImage';

function App() {
  return (
    <main className='p-4 max-w-screen-lg mx-auto'>
      <header className='text-center py-4'>
        <h1 className='text-4xl font-bold uppercase text-green-500 mb-4'>Super cat sticker 🐱</h1>
        <h2 className='text-lg'>
          <span className=' text-2xl'>
            Welcome to your <strong>cat meme builder</strong>!
          </span>
          <br /> Follow these simple steps to create your custom cat image and add unique flair with text and styling
          options.
        </h2>
      </header>
      <CatImage />
      <footer className='w-full relative text-center my-8 '>
        <div className='absolute w-full h-full -z-10 bg-gray-300/15 blur-xl' />
        <div className='p-4'>
          Developed by{' '}
          <Link color='primary' href='https://luisbovo.com.br' target='_blank'>
            Luis Bovo
          </Link>
        </div>
      </footer>
    </main>
  );
}

export default App;
