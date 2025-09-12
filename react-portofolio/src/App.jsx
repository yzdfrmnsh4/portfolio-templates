"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Textarea } from "./components/ui/textarea"

// React Icons (Font Awesome alternative)
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaLaptopCode,
  FaPencilRuler,
  FaMobile,
  FaSearch,
  FaStar,
  FaArrowUp,
  FaBars,
  FaTimes,
} from "react-icons/fa"

function App() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [typedText, setTypedText] = useState("")
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 200])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  // Typing animation effect
  useEffect(() => {
    const text = "Creative UI/UX Designer"
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  // Scroll to section
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  // Navigation items
  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "portfolio", label: "Portfolio" },
    { id: "services", label: "Services" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ]

  // Portfolio projects
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Modern shopping experience with seamless checkout",
      image: "/modern-ecommerce-website.png",
      tags: ["React", "Node.js", "MongoDB"],
      category: "web",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description: "Secure and intuitive financial management",
      image: "/mobile-banking-app.png",
      tags: ["React Native", "Firebase", "UI/UX"],
      category: "mobile",
    },
    {
      id: 3,
      title: "Dashboard Analytics",
      description: "Data visualization and business intelligence",
      image: "/analytics-dashboard-dark-theme.png",
      tags: ["Vue.js", "D3.js", "Python"],
      category: "web",
    },
  ]

  // Services
  const services = [
    {
      icon: <FaLaptopCode className="text-4xl text-primary" />,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies",
    },
    {
      icon: <FaMobile className="text-4xl text-primary" />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android",
    },
    {
      icon: <FaPencilRuler className="text-4xl text-primary" />,
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance user experience",
    },
    {
      icon: <FaSearch className="text-4xl text-primary" />,
      title: "SEO Optimization",
      description: "Search engine optimization to improve your online visibility",
    },
  ]

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "Exceptional work! The portfolio website exceeded our expectations.",
      rating: 5,
      avatar: "/professional-woman-avatar.png",
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Product Manager, InnovateCorp",
      content: "Outstanding attention to detail and creative problem-solving skills.",
      rating: 5,
      avatar: "/professional-man-avatar.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-primary"
            >
              Portfolio
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground hover:text-primary transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-t border-border"
            >
              <div className="px-4 py-2 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background">
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img
              src="/professional-designer-portrait.png"
              alt="Profile"
              className="w-48 h-48 rounded-full mx-auto mb-8 border-4 border-primary/20 hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-balance"
          >
            Your Name
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-muted-foreground mb-8 h-12"
          >
            {typedText}
            <span className="animate-pulse">|</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => scrollToSection("portfolio")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg hover:scale-105 transition-all duration-300 glow"
            >
              View My Work
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg hover:scale-105 transition-all duration-300"
            >
              Hire Me
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-card-foreground text-balance">About Me</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Passionate designer with 5+ years of experience creating digital experiences that users love.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="/creative-workspace.jpg"
                alt="About Me"
                className="rounded-lg shadow-lg hover:rotate-2 transition-transform duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-card-foreground leading-relaxed text-pretty">
                I'm a passionate UI/UX designer who believes in creating meaningful digital experiences. With a
                background in both design and development, I bridge the gap between beautiful interfaces and functional
                user experiences.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <FaPencilRuler />, label: "UI Design", count: "50+" },
                  { icon: <FaLaptopCode />, label: "Projects", count: "100+" },
                  { icon: <FaMobile />, label: "Apps", count: "25+" },
                  { icon: <FaStar />, label: "Reviews", count: "5.0" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-4 bg-background rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="text-2xl text-primary mb-2 flex justify-center">{stat.icon}</div>
                    <div className="text-2xl font-bold text-foreground">{stat.count}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">My Work</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              A collection of projects that showcase my skills and creativity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button className="bg-white text-primary hover:bg-gray-100">View Details</Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 text-pretty">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-card-foreground text-balance">Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Comprehensive design and development services to bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300 group">
                  <CardContent className="p-0">
                    <div className="mb-4 group-hover:animate-bounce">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-card-foreground">{service.title}</h3>
                    <p className="text-muted-foreground text-pretty">{service.description}</p>
                    <Button variant="link" className="mt-4 text-primary hover:underline">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">What Clients Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Don't just take my word for it - here's what my clients have to say.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 text-pretty">"{testimonial.content}"</p>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Ready to start your next project? Let's create something amazing together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <CardContent className="p-0 space-y-4">
                  <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                  <div>
                    <Input
                      placeholder="Your Name"
                      className="focus:ring-2 focus:ring-primary transition-all duration-300"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="focus:ring-2 focus:ring-primary transition-all duration-300"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      rows={5}
                      className="focus:ring-2 focus:ring-primary transition-all duration-300"
                    />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-300">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 group">
                    <FaEnvelope className="text-primary text-xl group-hover:animate-pulse" />
                    <span>hello@yourname.com</span>
                  </div>
                  <div className="flex items-center space-x-4 group">
                    <FaPhone className="text-primary text-xl group-hover:animate-pulse" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: <FaGithub />, href: "#" },
                    { icon: <FaLinkedin />, href: "#" },
                    { icon: <FaTwitter />, href: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors duration-300"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <img
                  src="/creative-workspace.jpg"
                  alt="Location Map"
                  className="w-full h-48 object-cover rounded hover:scale-105 transition-transform duration-300"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">Portfolio</h3>
              <p className="text-muted-foreground text-pretty">
                Creating digital experiences that inspire and engage users worldwide.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {navItems.slice(1).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Connect</h4>
              <div className="flex space-x-4">
                {[
                  { icon: <FaGithub />, href: "#" },
                  { icon: <FaLinkedin />, href: "#" },
                  { icon: <FaTwitter />, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">© 2024 Your Name. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollY > 300 ? 1 : 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/80 transition-all duration-300 hover:scale-110 z-40"
      >
        <FaArrowUp />
      </motion.button>
    </div>
  )
}

export default App
