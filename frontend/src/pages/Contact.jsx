import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div>
      {/* 🔹 Company Info Section */}
      <section className="company-section">
        <div className="company-content">
        <div className="info-wrapper">
  <div className="info-row">
    <div className="info-block">
      <h3>📍 Address</h3>
      <p>
        Mahalakshmi Steels<br />
        Rasi Nagar,<br />
        Karur District, Tamil Nadu – 639001, India
      </p>
    </div>

    <div className="info-block">
      <h3>⏰ Business Hours</h3>
      <p>
        Monday – Saturday: 9:00 AM – 6:00 PM<br />
        Sunday: Closed
      </p>
    </div>

    <div className="info-block">
      <h3>📞 Phone</h3>
      <p>
        +91 98765 43210<br />
        +91 91234 56789
      </p>
    </div>

    <div className="info-block">
      <h3>📧 Email</h3>
      <p>
        info@mahalakshmisteels.com<br />
        support@mahalakshmisteels.com
      </p>
    </div>
  </div>
</div>


          <div className="map-wrapper">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.206933602744!2d78.08161237506427!3d10.960647689209409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00747fcb27647f%3A0xbbfd8044a778a6de!2sKarur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1713349200000!5m2!1sen!2sin"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* 🔹 Contact Form & Image Section */}
      <div className="contact-container">
        <div className="contact-left">
          <img src="/img/contact-img.jpg" alt="Contact Us" />
        </div>

        <div className="contact-right">
          <h4>Contact Us</h4>
          <h2>Get in Touch with Us</h2>

          <form className="form">
            <input type="text" placeholder="Your name*" required />
            <input type="email" placeholder="Your e-mail*" required />
            <textarea placeholder="Your message*" required />
            <button type="submit">SEND MESSAGE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
