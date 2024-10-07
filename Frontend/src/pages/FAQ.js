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
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery typically takes 3-5 business days depending on your location."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only offer shipping within Nepal. We are working on expanding our services internationally."
    },
    {
      question: "Can I track my order?",
      answer: "Yes, once your order has been shipped, we will provide you with a tracking number via email."
    },
    {
      question: "What if my product arrives damaged?",
      answer: "If your product arrives damaged, please contact our customer support immediately for assistance with a return or exchange."
    },
    {
      question: "Do you offer discounts or promotions?",
      answer: "Yes, we occasionally offer discounts and promotions. Keep an eye on our website and subscribe to our newsletter for updates."
    },
    {
      question: "How can I cancel my order?",
      answer: "You can cancel your order within 24 hours of placing it by contacting our customer support."
    },
    {
      question: "Can I change my shipping address after placing an order?",
      answer: "Yes, you can change your shipping address before your order has been shipped by contacting our customer support."
    },
    {
      question: "Are all your products new and original?",
      answer: "Yes, all the products we sell are brand new and sourced from original manufacturers."
    },
    {
      question: "How do I know if a product is in stock?",
      answer: "The product page will indicate whether the item is in stock. If out of stock, it will be labeled accordingly."
    },
    {
      question: "Can I place an order over the phone?",
      answer: "Currently, we only accept orders through our website. However, you can contact customer support for assistance."
    },
    {
      question: "What if I receive the wrong item?",
      answer: "If you receive an incorrect item, contact us immediately and we will arrange for an exchange."
    },
    {
      question: "Do you have a loyalty program?",
      answer: "We are in the process of developing a loyalty program. Please check back soon for more details."
    },
    {
      question: "Can I leave a product review?",
      answer: "Yes, we encourage customers to leave reviews on product pages after their purchase."
    },
    {
      question: "How do I subscribe to your newsletter?",
      answer: "You can subscribe to our newsletter by entering your email address in the subscription box found at the bottom of our website."
    },
    {
      question: "What should I do if I forget my password?",
      answer: "If you forget your password, click on 'Forgot Password' on the login page and follow the instructions to reset it."
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
