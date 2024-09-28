import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-slate-200'>
      <div className='container mx-auto p-4'>
        <p className='text-center font-bold text-pretty text-black' title="Minor Project2024">
          © 2024 InstaCart. All rights reserved.
        </p>
        <div className='flex justify-center gap-4 mt-4'>
          <a 
            href='https://facebook.com/umesh.bhatt.731572/' 
            target='_blank' 
            rel='noopener noreferrer' 
            className='text-blue-600 hover:text-blue-800'>
            <FaFacebook size={24} />
          </a>
          <a 
            href='https://instagram.com/i_am_eub/' 
            target='_blank' 
            rel='noopener noreferrer' 
            className='text-pink-600 hover:text-pink-800'>
            <FaInstagram size={24} />
          </a>
          <a 
            href='https://youtube.com/@umesh_techno' 
            target='_blank' 
            rel='noopener noreferrer' 
            className='text-red-600 hover:text-red-800'>
            <FaYoutube size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
