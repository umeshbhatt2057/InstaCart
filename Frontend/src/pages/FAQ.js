import React, { useEffect } from 'react';

const Faq = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when FAQ component is loaded
  }, []);

  const faqs = [
    {
      question: "What is Instacart?",
      answer: "Instacart is an online eCommerce platform that specializes in providing a wide range of electronic devices. We offer an extensive selection of high-quality products from leading brands, allowing customers to find exactly what they need, from smartphones to home electronics, with the convenience of shopping from home."
    },
    {
      question: "How do I create an account?",
      answer: "Creating an account is simple and quick. Just click on the 'Sign Up' button at the top of the homepage, and you'll be prompted to fill in your basic details like your name, email address, and password. Once you've completed the form, your account will be created, and you'll have access to personalized features like order history and faster checkout."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We offer a variety of convenient payment methods, including popular digital wallets such as eSewa, Khalti, IME Pay, FonePay, and Connect IPS. However, due to temporary technical issues with our payment gateways, we are currently only accepting cash on delivery (COD) as a payment method. We apologize for any inconvenience and are working to resolve the issue."
    },
    {
      question: "What is your return policy?",
      answer: "Our return policy allows you to return most products within 30 days of purchase. If you're not fully satisfied with your item, simply contact our customer support to initiate the return process. The product must be in its original packaging and in unused condition to qualify for a refund or exchange."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can easily reach our customer support team via phone or email. For immediate assistance, call us at +9779865941673. Alternatively, you can send an email to instacart143@gmail.com, and one of our representatives will get back to you as soon as possible to help with any questions or concerns."
    },
    {
      question: "How long does delivery take?",
      answer: "Typically, delivery times range between 3-5 business days depending on your location within Nepal. Orders placed closer to urban centers may arrive faster, while those in more remote areas may take slightly longer. Rest assured, we strive to deliver your products as quickly as possible while ensuring they arrive in perfect condition."
    },
    {
      question: "Do you offer international shipping?",
      answer: "At this time, we only offer shipping within Nepal. However, we are working diligently to expand our delivery network to international customers. Stay tuned for future updates, as we plan to bring our products to more regions around the world in the near future."
    },
    {
      question: "Can I track my order?",
      answer: "Yes, you can track your order once it has been shipped. We will send you an email with a tracking number and a link to the courier's website, where you can monitor the progress of your delivery and get real-time updates on when your order will arrive."
    },
    {
      question: "What if my product arrives damaged?",
      answer: "In the rare event that your product arrives damaged, please reach out to our customer support team immediately. We will guide you through the process of returning the damaged item and arranging for either a replacement or a refund, depending on your preference."
    },
    {
      question: "Do you offer discounts or promotions?",
      answer: "Yes, we periodically offer discounts and promotions on select products. To stay informed about our latest deals, be sure to check our website regularly and sign up for our newsletter. By subscribing, you'll receive exclusive updates on special offers and new arrivals directly in your inbox."
    },
    {
      question: "How can I cancel my order?",
      answer: "You can cancel your order within 24 hours of placing it by contacting our customer support team. After this time frame, cancellations may not be possible if the order has already been processed for shipment, but our support team will guide you through your options."
    },
    {
      question: "Can I change my shipping address after placing an order?",
      answer: "Yes, you can change your shipping address, but only if your order has not yet been shipped. If you need to update the address, contact our customer support as soon as possible with your new details, and we'll do our best to accommodate your request."
    },
    {
      question: "Are all your products new and original?",
      answer: "Absolutely! We pride ourselves on offering only brand new, high-quality products that are sourced directly from original manufacturers or authorized distributors. Each item you purchase from Instacart comes with the assurance of authenticity and reliability."
    },
    {
      question: "How do I know if a product is in stock?",
      answer: "Our product pages are updated in real-time to reflect current stock levels. If a product is out of stock, it will be clearly marked on the page, and you can choose to receive notifications when it becomes available again."
    },
    {
      question: "Can I place an order over the phone?",
      answer: "Currently, we only accept orders through our website. This ensures that all orders are processed efficiently and securely. If you encounter any issues with placing an order online, our customer support team is always available to assist you."
    },
    {
      question: "What if I receive the wrong item?",
      answer: "If you receive an incorrect item, please contact our customer support immediately. We will quickly arrange for the wrong product to be returned and ensure that the correct item is sent to you as soon as possible."
    },
    {
      question: "Do you have a loyalty program?",
      answer: "We are in the process of developing an exciting loyalty program for our customers. This will allow you to earn points on your purchases that can be redeemed for discounts or special rewards. Please check back soon for more details on this program."
    },
    {
      question: "Can I leave a product review?",
      answer: "Yes, we encourage all of our customers to leave reviews for the products they purchase, as it helps other shoppers make informed decisions. However, due to some temporary technical issues, we are currently unable to offer this feature. We are working hard to restore it as soon as possible and apologize for the inconvenience."
    },
    {
      question: "How do I subscribe to your newsletter?",
      answer: "Subscribing to our newsletter is easy! Simply scroll down to the bottom of our website and enter your email address in the subscription box. Once subscribed, you'll receive regular updates on new products, special promotions, and other important news from Instacart."
    },
    {
      question: "What should I do if I forget my password?",
      answer: "If you forget your password, don't worry! Just click on the 'Forgot Password' link on the login page and follow the instructions. You'll be able to reset your password through an email link, allowing you to regain access to your account quickly and securely."
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
