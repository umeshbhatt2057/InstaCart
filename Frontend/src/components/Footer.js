import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Import images from assets
import UmeshPhoto from '../assest/Umesh.jpg';
import DineshPhoto from '../assest/Dinesh.jpg';
import Member3Photo from '../assest/Puskar.jpg';
import NeelamPhoto from '../assest/Neelam.jpg';
import ShreyaPhoto from '../assest/Shreya.jpg';

const Footer = () => {
  const teamMembers = [
    {
      name: "Dinesh Bhatt",
      photo: DineshPhoto,
      role: "QA Engineer/Frontend "
    },
    {
      name: "Neelam Dhami",
      photo: NeelamPhoto,
      role: "Frontend Developer"
    },
    {
      name: "Umesh Bhatt",
      photo: UmeshPhoto,
      role: "Team Lead,Backend Developer"
    },
    {
      name: "Shreya Joshi",
      photo: ShreyaPhoto,
      role: "UI/UX Designer"
    },
    {
      name: "Puskar Bhatt",
      photo: Member3Photo,
      role: "Backend Developer"
    }
  ];

  return (
    <footer className='bg-slate-200 py-8'>
      <div className='container mx-auto p-4'>
        
        {/* Team Members Section */}
        <div className='text-center mb-8'>
          <h2 className='text-2xl font-bold text-black'>Our Team</h2>
        </div>
        
        <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className='text-center'
              style={{
                transform: member.role === "Team Lead" ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <img 
                src={member.photo} 
                alt={member.name} 
                className={`mx-auto rounded-full object-cover 
                  ${member.role === "Team Lead" ? 'w-28 h-28' : 'w-24 h-24'}`}
              />
              <p className={`mt-2 font-semibold 
                ${member.role === "Team Lead" ? 'text-lg' : 'text-base'}`}>
                {member.name}
              </p>
              <p className={`text-sm text-gray-600 
                ${member.role === "Team Lead" ? 'font-bold' : ''}`}>
                {member.role}
              </p>
            </div>
          ))}
        </div>

        {/* Customer Support Section */}
        <div className='text-center mt-8 mb-8'>
          <h3 className='text-lg font-bold text-black'>Customer Support</h3>
          <p className='text-gray-700'>
            For any inquiries, feel free to contact us at:
          </p>
          <p className='text-gray-800 font-semibold'>
            Phone: +9779865941673, +9779806469215
          </p>
          <p className='text-gray-800 font-semibold'>
            Email: <a href='mailto:instacart143@gmail.com' className='text-blue-600 hover:underline'>instacart143@gmail.com</a>
          </p>
        </div>

        {/* FAQ Link */}
        <div className='text-center mt-8'>
          <Link to="/faq" className='text-blue-600 hover:underline'>
            Frequently Asked Questions
          </Link>
        </div>

        {/* Footer Title */}
        <p className='text-center font-bold text-black mt-8 mb-4' title="Minor Project2024">
          © 2024 InstaCart. All rights reserved.
        </p>

        {/* Social Media Links */}
        <div className='flex justify-center gap-4'>
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
