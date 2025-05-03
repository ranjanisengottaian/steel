import React from 'react';
import './WhyChooseUs.css';

const benefits = [
  {
    icon: '🏗️',
    title: 'Premium Quality Steel',
    description: 'We deliver high-grade, certified steel products built for durability and performance.',
    color: '#d9534f',
  },
  {
    icon: '⚙️',
    title: 'Custom Fabrication',
    description: 'Tailored steel solutions for your unique industrial and construction needs.',
    color: '#5bc0de',
  },
  {
    icon: '🚚',
    title: 'On-Time Delivery',
    description: 'Reliable logistics ensure your steel products arrive safely and on schedule.',
    color: '#5cb85c',
  },
  {
    icon: '🔩',
    title: 'Wide Product Range',
    description: 'From rods to beams, we offer a comprehensive selection under one roof.',
    color: '#f0ad4e',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose-section">
      <h2 className="section-title">Why Choose Us</h2>
      <div className="benefit-cards">
        {benefits.map((item, index) => (
          <div className="benefit-card" key={index}>
            <div className="benefit-icon" style={{ backgroundColor: item.color }}>
              <span>{item.icon}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
