import { useState } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { CheckCircle, Mail, MapPin } from 'lucide-react';
import { Tilt } from 'react-tilt';

const pageVariants = {
  initial: { opacity: 0, scale: 0.9 },
  in: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  out: { opacity: 0, scale: 1.1, transition: { duration: 0.5, ease: "easeIn" } }
};

const contactInfo = [
  { icon: Mail, title: 'Email', value: 'shamvelayutham541@gmail.com' },
  { icon: MapPin, title: 'Location', value: 'Coimbatore, India' }
];

const InteractiveCard = ({ children, className, tiltMax = 10 }) => {
  return (
    <Tilt options={{ max: tiltMax, scale: 1.02, speed: 400, glare: true, 'max-glare': 0.15 }}>
      <div className={`relative overflow-hidden group ${className}`}>
        <div className="relative w-full h-full">
          {children}
        </div>
      </div>
    </Tilt>
  );
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(''); // 'idle', 'sending', 'success', 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-4"
    >
      {/* Set particle variant to connected to match the network look in the image */}
      <ParticleBackground variant="connected" />
      
      <div className="max-w-6xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
        
        {/* Left Column - Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-cyan-accent font-mono tracking-widest uppercase text-sm mb-2">GET IN TOUCH</h3>
            <h2 className="text-5xl md:text-6xl font-bold font-grotesk text-white mb-6">Contact Me</h2>
            <p className="text-gray-300 text-lg leading-relaxed font-light">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision. Send a quick message and I'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-4">
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <InteractiveCard className="bg-gradient-to-br from-surface/80 to-surface/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl h-full flex flex-col items-start space-y-4 cursor-pointer hover:border-cyan-accent/50 transition-colors duration-500" tiltMax={20}>
                  <div className="p-4 rounded-xl bg-cyan-accent/10 text-cyan-accent group-hover:scale-105 transition-all duration-300">
                    <info.icon size={28} />
                  </div>
                  <div className="w-full">
                    <h4 className="text-cyan-accent font-mono tracking-widest text-xs uppercase mb-1">{info.title}</h4>
                    <p className="text-white font-medium text-base md:text-lg font-grotesk truncate w-full">{info.value}</p>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="h-full">
          <InteractiveCard className="bg-surface/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl h-full" tiltMax={5}>
            {status === 'success' ? (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center space-y-4"
              >
                <CheckCircle size={64} className="text-cyan-accent" />
                <h3 className="text-2xl font-bold text-white font-grotesk">Message Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. I'll respond shortly.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2 rounded-full bg-surface border border-white/10 text-white hover:border-cyan-accent transition-colors cursor-pointer"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-background/50 border border-white/5 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-accent/50 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all font-mono text-sm placeholder-gray-500 hover:border-white/20"
                    placeholder="Your Name"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-background/50 border border-white/5 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-accent/50 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all font-mono text-sm placeholder-gray-500 hover:border-white/20"
                    placeholder="Email Address"
                  />
                </div>
                
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-background/50 border border-white/5 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-accent/50 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all font-mono text-sm placeholder-gray-500 hover:border-white/20"
                  placeholder="Subject"
                />

                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full bg-background/50 border border-white/5 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-accent/50 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all font-mono text-sm placeholder-gray-500 resize-none hover:border-white/20"
                  placeholder="Write your message..."
                ></textarea>
                
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="px-8 py-3 bg-cyan-accent text-background font-bold rounded-lg hover:bg-cyan-accent/90 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] disabled:opacity-70 mt-4 active:scale-95 hover:-translate-y-1"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </InteractiveCard>
        </div>

      </div>
    </motion.div>
  );
}
