import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_6cy2jbe', // Your Service ID
        'template_x7vmzit', // Your Template ID
        {
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
        'LRZfZEr8FjgJ6p76u' // Your Public Key
      );

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    } catch (error) {
      alert('Failed to send message. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative h-56 flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-300">We'd love to hear from you. Let's talk diamonds.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT SIDE — UNCHANGED */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Whether you're looking for the perfect engagement ring, a custom design, or guidance on diamond investment — our experts are here to help every step of the way.
            </p>

            {/* Contact Info blocks — SAME as yours */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Showroom Address</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    42 Diamond Market, Mahidharpura<br />
                    Surat, Gujarat 395003, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-500 text-sm">+91 98765 43210</p>
                  <p className="text-gray-500 text-sm">+91 78901 23456</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-500 text-sm">info@shivgems.com</p>
                  <p className="text-gray-500 text-sm">orders@shivgems.com</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                  <p className="text-gray-500 text-sm">Monday – Saturday: 10:00 AM – 7:00 PM</p>
                  <p className="text-gray-500 text-sm">Sunday: By Appointment Only</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — FORM (Design SAME) */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 mb-6">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* All your inputs EXACTLY same */}
                  {/* (Keeping structure unchanged) */}

                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="name" required value={formData.name} onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input
                          type="email"
                          name="email"
                          required
                          pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                  <input type="tel" name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>General Inquiry</option>
                    <option>Custom Design Request</option>
                    <option>Order Status</option>
                    <option>Book Showroom Appointment</option>
                    <option>Investment in Diamonds</option>
                    <option>Return / Exchange</option>
                    <option>Other</option>
                  </select>

                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-white transition-colors ${
                      isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <><Send className="h-4 w-4" /> Send Message</>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;