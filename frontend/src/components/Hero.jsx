import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col sm:flex-row border border-gray-300 shadow-lg rounded-3xl mt-11 overflow-hidden animate-fade-in'>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 bg-gradient-to-r from-gray-100 to-white'>
        <div className='text-gray-900 text-center sm:text-left px-6'>
          <div className='flex items-center gap-2 animate-slide-left'>
            <p className='w-8 md:w-11 h-[2px] bg-gray-900'></p>
            <p className='font-semibold text-sm md:text-base tracking-wide uppercase'>Trending Now</p>
          </div>
          <h1 className='text-4xl sm:py-3 lg:text-6xl leading-snug font-extrabold tracking-wide animate-slide-up'>
            Discover <span className='text-blue-600'>New Arrivals</span>
          </h1>
          <p className='text-gray-600 text-sm md:text-base mt-2 animate-fade-in'>
            Elevate your style with the latest fashion trends, handpicked just for you.
            Explore our newest collection now!
          </p>
          <div
            className='flex items-center gap-2 mt-4 cursor-pointer hover:scale-105 transition-transform animate-bounce'
            onClick={() => navigate('/collection')} 
          >
            <p className='font-semibold text-sm md:text-base text-blue-600'>SHOP NOW</p>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}
      <img
        src={assets.hero_img}
        alt="Hero"
        className="w-full sm:w-1/2 rounded-3xl object-cover animate-slide-right"
      />
    </div>
  );
};

export default Hero;
