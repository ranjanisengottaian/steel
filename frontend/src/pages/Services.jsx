// Services.js
import React from 'react';
import './Services.css';

function Services() {
  const services = [
    {
      title: "Welding and Assembly",
      description: "Our skilled technicians ensure precision welding and efficient assembly for durable steel frameworks, optimized for structural integrity.",
      icon: "🧰",
    },
    {
      title: "Advanced CNC Cutting",
      description: "Utilizing state-of-the-art CNC machines, we deliver highly accurate steel cuts tailored to your engineering specifications.",
      icon: "💎",
    },
    {
      title: "Heat-Resistant Solutions",
      description: "We offer steel components engineered to withstand extreme temperatures, ideal for power plants and high-performance machinery.",
      icon: "🔥",
    },
    {
      title: "Bright & Polished Finishes",
      description: "Enhance visual appeal and performance with corrosion-resistant polished steel surfaces suitable for architectural and industrial use.",
      icon: "✨",
    },
    {
      title: "Quality Control & Finishing",
      description: "Each product undergoes rigorous inspection, sandblasting, and coating to ensure compliance with international standards.",
      icon: "🔍",
    },
    {
      title: "Custom Fabrication",
      description: "Tailor-made steel fabrication to meet project-specific dimensions, tolerances, and industry certifications.",
      icon: "📐",
    },
    
  ];

  return (
    <div className="services-page">
      <section className="hero">
        <div className="hero-overlay">
          <h1>Shaping Strength, Delivering Precision</h1>
          <p>Delivering precision, strength, and trust in every steel solution.</p>
        </div>
      </section>

      <section className="services-container">
        <h2 className="section-title">Professional Steel Services</h2>
        <p className="intro-text">
          At Mahalakshmi Steels, we combine advanced technology with skilled craftsmanship to deliver solutions tailored to the evolving needs of the construction and manufacturing sectors.
        </p>
        <div className="cards-wrapper">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="#">Supplier Quality Requirements</a>
          <span>|</span>
          <a href="#">Terms and Conditions of Sale</a>
          <span>|</span>
          <a href="#">Purchase Order Terms</a>
          <span>|</span>
          <a href="#">Terms of Use</a>
        </div>
        <p className="copyright">
          Copyright 2025 Mahalakshmi Steels. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Services;