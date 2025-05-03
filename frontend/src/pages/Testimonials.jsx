import React, { useEffect, useState } from 'react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'E. Uma Maheswaran',
    role: 'Founder & Owner, Mahalakshmi Steels',
    image: '/img/testimonial1.png', // Replace with high-quality image path
    text: `At Mahalakshmi Steels, we take immense pride in delivering excellence through every product we offer. Our commitment to quality, reliability, and customer satisfaction has made us a trusted name in the steel industry. We continue to grow with innovation and dedication, ensuring our clients receive only the best solutions for their infrastructure needs.`,
  },
  {
    name: 'U. Vijay',
    role: 'Operations Manager',
    image: '/img/testimonial2.png', // Replace with high-quality image path
    text: `Working at Mahalakshmi Steels has been an incredible journey. We strive for operational excellence and timely delivery across all projects. Our team is focused on customer-centric service, maintaining consistent quality, and staying aligned with the evolving demands of the industry. I'm proud to be part of a company that puts integrity and performance at its core.`,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // 10 seconds

    return () => clearInterval(timer);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="testimonial-section">
      <div className="testimonial-overlay">
        <h4 className="testimonial-subtitle">They Say</h4>
        <h2 className="testimonial-title">Testimonials</h2>
        <div className="testimonial-content">
          <img
            src={currentTestimonial.image}
            alt={currentTestimonial.name}
            className="testimonial-image"
          />
          <p className="testimonial-text">“ {currentTestimonial.text} ”</p>
          <h4 className="testimonial-name">
            {currentTestimonial.name}, <span>{currentTestimonial.role}</span>
          </h4>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
