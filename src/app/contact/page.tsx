'use client';
import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  Clock, 
  Globe,
  Github,
  Linkedin,
  Twitter,
  Calendar,
  CheckCircle,
  User,
  Building,
  FileText
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    projectType: 'general'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        projectType: 'general'
      });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'chawlaraghav78@gmail.com',
      description: 'Send me an email anytime',
      link: 'mailto:chawlaraghav78@gmail.com',
      color: 'text-blue-400'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 998121 79058',
      description: 'Mon-Fri from 9am to 6pm',
      link: 'tel:+919812179058',
      color: 'text-green-400'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Panipat, Haryana',
      description: 'India',
      link: '#',
      color: 'text-purple-400'
    },
    {
      icon: Calendar,
      title: 'Schedule Call',
      value: 'Book a Meeting',
      description: 'Let\'s discuss your project',
      link: '#',
      color: 'text-orange-400'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      username: '@RCcoders',
      link: 'https://github.com/RCCoders',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      username: 'Raghav Chawla',
      link: 'https://www.linkedin.com/in/raghav-chawla-29255b275/',
      color: 'hover:text-blue-400'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      username: '@raghav_dev',
      link: 'https://twitter.com',
      color: 'hover:text-sky-400'
    },
    {
      icon: Globe,
      name: 'Website',
      username: 'raghavchawla.dev',
      link: '#',
      color: 'hover:text-purple-400'
    }
  ];

  const projectTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'data-science', label: 'Data Science Project' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'collaboration', label: 'Collaboration' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Let us{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Connect
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your ideas into reality? Whether you have a project in mind, 
              need consulting, or just want to discuss the latest in AI and data science, 
              I would love to hear from you.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
            <div className="flex items-center mb-6">
              <MessageCircle className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Send a Message</h2>
            </div>
            
            {submitStatus === 'success' && (
              <div className="flex items-center bg-green-600/20 border border-green-600/50 text-green-400 p-4 rounded-lg mb-6">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Message sent successfully! I will get back to you soon.</span>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Your company (optional)"
                  />
                </div>
                
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value} className="bg-gray-700">
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Tell me about your project, requirements, timeline, or any questions you have..."
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.link}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-700/30 transition-colors duration-200 group"
                  >
                    <div className={`${method.color} bg-gray-700/50 p-3 rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                      <method.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{method.title}</h3>
                      <p className={`${method.color} font-medium mb-1`}>{method.value}</p>
                      <p className="text-gray-400 text-sm">{method.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center mb-3">
                <Clock className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="text-white font-semibold">Response Time</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                I typically respond to emails within 24 hours on weekdays. 
                For urgent matters, feel free to call me directly.
              </p>
            </div>

            {/* Social Links */}
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Connect Online</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-3 p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 text-gray-300 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                    <div>
                      <p className="font-medium">{social.name}</p>
                      <p className="text-sm opacity-75">{social.username}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-white font-semibold mb-4">Current Availability</h3>
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-green-400 font-medium">Available for new projects</span>
              </div>
              <p className="text-gray-300 text-sm">
                I am currently accepting new projects and collaborations. 
                Let us discuss how we can work together!
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What's your typical project timeline?",
                answer: "Project timelines vary based on complexity, but most data science projects take 2-6 weeks, while web development projects typically take 1-4 weeks."
              },
              {
                question: "Do you work with international clients?",
                answer: "Absolutely! I work with clients globally and am comfortable with remote collaboration across different time zones."
              },
              {
                question: "What technologies do you specialize in?",
                answer: "I specialize in Python, Data Science, Machine Learning, AI, and web development with modern frameworks like React and Node.js."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes, I offer maintenance and support packages for all projects to ensure they continue to perform optimally over time."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-white font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}