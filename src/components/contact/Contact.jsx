import React from "react";
import img from "../images/pricing1.png";
import Back from "../common/Back";
import "./contact.css";

const Contact = () => {
  return (
    <section className="contact">
      <Back
        name="Contact Us"
        title="Get Helps & Friendly Support"
        cover={img}
      />
      <div className="container">
        <div className="contact-form">
          <h4>Fill Up The Form</h4>
          <form>
            <div className="input-group">
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
            </div>
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Message" rows="5" required></textarea>
            <button type="submit">Submit Request</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
