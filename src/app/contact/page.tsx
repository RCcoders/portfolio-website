'use client';
import React, { useState, useRef, useEffect } from 'react';
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
  FileText,
  Bot,
  X,
  Minimize2,
  Maximize2,
  Loader
} from 'lucide-react';

// AI Chatbot Component
function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi! I'm Raghav's AI assistant. I can help you learn more about his services, experience, or answer any questions about potential projects. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Mock AI responses - Replace with actual API call
  const getAIResponse = async (userMessage) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple keyword-based responses - replace with actual AI API
    if (lowerMessage.includes('service') || lowerMessage.includes('what do') || lowerMessage.includes('offer')) {
      return "Raghav specializes in Data Science, Machine Learning, AI solutions, and Full-Stack Web Development. His main services include:\n\n• Custom ML models and AI solutions\n• Data analysis and visualization\n• Web applications (React, Node.js, Python)\n• Automation scripts and tools\n• Cloud deployment (AWS, Vercel)\n• Technical consulting\n\nWhich area interests you most?";
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
      return "Raghav is a skilled developer with expertise in:\n\n• Python, JavaScript, React, Node.js\n• Machine Learning frameworks (TensorFlow, PyTorch, Scikit-learn)\n• Data Science tools (Pandas, NumPy, Matplotlib)\n• Cloud platforms and deployment\n• Database management\n\nHe has worked on various projects ranging from predictive models to full-stack web applications. Would you like to know about any specific technology or project type?";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate')) {
      return "Project pricing depends on several factors like complexity, timeline, and requirements. Raghav offers competitive rates and can provide:\n\n• Hourly consulting rates\n• Fixed-price project quotes\n• Retainer agreements for ongoing work\n\nFor an accurate quote, it's best to discuss your specific project requirements. Would you like me to help you prepare details for a project inquiry?";
    }
    
    if (lowerMessage.includes('timeline') || lowerMessage.includes('how long') || lowerMessage.includes('duration')) {
      return "Project timelines vary based on scope and complexity:\n\n• Simple automation scripts: 1-3 days\n• Data analysis projects: 1-2 weeks\n• ML model development: 2-4 weeks\n• Web applications: 2-6 weeks\n• Complex AI solutions: 4-8 weeks\n\nRaghav always provides realistic timelines during project planning. What type of project are you considering?";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('get in touch')) {
      return "You can reach Raghav through several channels:\n\n📧 Email: chawlaraghav78@gmail.com\n📱 Phone: +91 998121 79058\n💼 LinkedIn: https://www.linkedin.com/in/raghav-chawla-29255b275/\n💻 GitHub: https://github.com/RCCoders\n\nHe typically responds to emails within 24 hours on weekdays. For urgent matters, calling directly is recommended!";
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Great to meet you! I'm here to help you learn more about Raghav's services and expertise. Whether you're interested in:\n\n• Data Science & Machine Learning\n• Web Development\n• AI Solutions\n• Technical Consulting\n\nFeel free to ask me anything! What would you like to know?";
    }
    
    // Default response
    return "That's a great question! While I can provide general information about Raghav's services, I'd recommend reaching out to him directly for detailed discussions about your specific needs.\n\nYou can:\n• Fill out the contact form on this page\n• Email him at chawlaraghav78@gmail.com\n• Call him at +91 998121 79058\n\nIs there anything specific about his services or experience you'd like to know more about?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) {
      return;
    }

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message
    const newUserMessage = {
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await getAIResponse(userMessage);
      
      const aiMessage = {
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const errorMessage = {
        type: 'bot',
        content: "I apologize, but I'm having trouble responding right now. Please try reaching out to Raghav directly via email or phone for immediate assistance.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 group"
        >
          <Bot className="w-6 h-6" />
          <div className="absolute -top-12 right-0 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Chat with AI Assistant
          </div>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl z-50 transition-all duration-300 ${
          isMinimized ? 'h-14' : 'h-96 w-80 md:w-96'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                <p className="text-gray-400 text-xs">Online now</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-gray-400 hover:text-white p-1 rounded transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'bg-gray-700 text-gray-100'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Loader className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex space-x-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about Raghav's services..."
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
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
  setSubmitStatus(null);

  try {
    const response = await fetch("https://formspree.io/f/movlgrge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setSubmitStatus("error");
    }
  } catch {
    setSubmitStatus("error");
  } finally {
    setIsSubmitting(false);
  }
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
  { value: 'deep-learning', label: 'Deep Learning / Neural Networks' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'frontend', label: 'Frontend Development' },
  { value: 'backend-api', label: 'Backend/API Development' },
  { value: 'flask-django', label: 'Flask/Django Project' },
  { value: 'streamlit-app', label: 'Streamlit Dashboard / Tool' },
  { value: 'automation', label: 'Python Automation Script' },
  { value: 'chatbot', label: 'Chatbot / LLM Integration' },
  { value: 'cv-nlp', label: 'Computer Vision / NLP' },
  { value: 'cloud', label: 'Cloud Deployment (AWS, Vercel, etc.)' },
  { value: 'consulting', label: 'Tech Consulting / Advice' },
  { value: 'collaboration', label: 'Open Source Collaboration' }
];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
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
            <div className="mt-8 flex items-center justify-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center">
                <Bot className="w-4 h-4 mr-2 text-blue-400" />
                <span>Try the AI assistant for quick questions</span>
              </div>
            </div>
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
                    placeholder="your@email.com"
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
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none overflow-y-auto"
                    size={1}
                  >
                    {projectTypes.map((type) => (
                      <option
                        key={type.value}
                        value={type.value}
                        className="bg-gray-700 text-white"
                      >
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

            {/* AI Assistant Info */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center mb-3">
                <Bot className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="text-white font-semibold">AI Assistant Available</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                Got quick questions about my services, experience, or project types? 
                Chat with my AI assistant for instant answers!
              </p>
              <div className="text-xs text-gray-400">
                Available 24/7 • Instant responses • No signup required
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center mb-3">
                <Clock className="w-5 h-5 text-green-400 mr-2" />
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

      {/* AI Chatbot Component */}
      <AIChatbot />
    </div>
  );
}