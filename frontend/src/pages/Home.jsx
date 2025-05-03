import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

import Contact from './Contact';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import Sourcing from '../components/Sourcing';


function Home() {
  return (
    <div>

      {/* Quote Section */}
      <section className="quote-section">
        <div className="quote-overlay">
          <h1>"The Steel of India"</h1>
          <p>Strong. Reliable. Built to Last.</p>
        </div>
      </section>

      <section className="service-card-container">
        <div className="service-card">
          <img src="/img/Steel-pipe.jpeg" alt="Steel Pipe Service" />
          <div className="service-info">
            <h3>Steel Pipe Supply</h3>
            <p>Supplying high-strength steel pipes for industrial and commercial applications.</p>
            <button className="service-btn">Learn More</button>
          </div>
        </div>
        <div className="service-card">
          <img src="/img/Steel-rod.jpg" alt="Steel Rod Service" />
          <div className="service-info">
            <h3>Steel Rod Supply</h3>
            <p>Providing high-quality steel rods for construction and infrastructure projects.</p>
            <button className="service-btn">Learn More</button>
          </div>
        </div>
        <div className="service-card">
          <img src="/img/Steel-sheet.jpeg" alt="Steel Sheet Service" />
          <div className="service-info">
            <h3>Steel Sheet Supply</h3>
            <p>Durable, corrosion-resistant steel sheets for various applications.</p>
            <button className="service-btn">Learn More</button>
          </div>
        </div>
        <div className="service-card">
          <img src="/img/steel-beam.jpeg" alt="Steel Beam Service" />
          <div className="service-info">
            <h3>Steel Beam Supply</h3>
            <p>High-quality steel beams for construction, infrastructure, and industrial applications.</p>
            <button className="service-btn">Learn More</button>
          </div>
        </div>
      </section>


      {/* About Us Section */}
      <section className="about-section">
        <div className="about-bg-overlay"></div>

        <div className="about-content-wrapper">
          <div className="about-image-side">
            <img src="/img/welding1.jpg" alt="Welding Steel" />
          </div>

          <div className="about-text-side">
            <h4>THE STORY</h4>
            <h2>About Us</h2>
            <h3>Delivering Engineered Solutions!</h3>
            <p>
              Welcome to Mahalakshmi Steels, your trusted provider of
              premium steel products. We offer materials for industrial, commercial,
              and residential construction. Our website features easy navigation and seamless
              online ordering. From high-strength rods to custom solutions, our products meet
              top industry standards. We're committed to delivering strength, value, and reliability
              with every order.
            </p>
            <button className="read-more-btn">READ MORE</button>
          </div>
        </div>
      </section>


      {/* Why Choose Us Section */}
      <WhyChooseUs />


      {/* Testimonials Section */}
      <Testimonials/>

      {/* Sourcing Section */}
      <Sourcing />

      {/* Contact Section */}
      <section className="contact-section">
        <Contact />
      </section>

    </div>
  );
}

export default Home;
