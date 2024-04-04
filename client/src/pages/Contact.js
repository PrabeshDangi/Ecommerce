import React from "react";
import Layout from "../components/Layout/Layout";

const Contact = () => {
  return (
    <Layout title={"Contact-Us"}>
      <div className="contact-us-container">
        <div className="contact-content">
          <div className="contact-info">
            <h1>Contact Us</h1>
            <p>
              We'd love to hear from you! Feel free to reach out to us via
              email, phone, or visit our office.
            </p>
            <div className="contact-details">
              <div className="contact-info-item">
                <h2>Email</h2>
                <p>contact@example.com</p>
              </div>
              <div className="contact-info-item">
                <h2>Phone</h2>
                <p>+1234567890</p>
              </div>
              <div className="contact-info-item">
                <h2>Address</h2>
                <p>123 Main Street, City, Country</p>
              </div>
            </div>
          </div>
          <div className="contact-image"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
