import React, { useEffect } from 'react';

const Faq = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when FAQ component is loaded
  }, []);

  const faqs = [
    {
      question: "What is Instacart?",
      answer: "Instacart is an online eCommerce platform that specializes in providing a wide range of electronic devices."
    },
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button and fill in your details."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We offer various payment methods, including eSewa, Khalti, IME Pay, FonePay, and Connect IPS. However, due to technical issues, we are currently only accepting cash on delivery."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy on most products."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach us via phone at +9779865941673 or email at instacart143@gmail.com."
    }
  ];

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold text-center mb-8'>Frequently Asked Questions</h1>
      <div className='space-y-4'>
        {faqs.map((faq, index) => (
          <div key={index} className='bg-white p-4 rounded shadow-md'>
            <h2 className='font-semibold text-lg'>{faq.question}</h2>
            <p className='text-gray-600'>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
