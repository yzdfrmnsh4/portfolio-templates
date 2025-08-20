// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Add smooth scrolling to all nav links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href").substring(1)
    scrollToSection(targetId)
  })
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe all comic panels and project cards
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(".comic-panel, .project-card, .section-header")
  elementsToAnimate.forEach((el) => observer.observe(el))
})

// Project modal/popup functionality
function openProject(projectId) {
  // You can customize this to open a modal, redirect to a project page, etc.
  alert(`Opening project ${projectId}! You can customize this function to show project details.`)

  // Example: Open project in new tab
  // window.open(`project-${projectId}.html`, '_blank');

  // Example: Show modal with project details
  // showProjectModal(projectId);
}

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(e.target)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Basic validation
  if (!name || !email || !subject || !message) {
    showAlert("Please fill in all fields!", "error")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    showAlert("Please enter a valid email address!", "error")
    return
  }

  // Simulate form submission (replace with your actual form handling)
  showAlert("Thanks for your message! I'll get back to you soon!", "success")
  e.target.reset()

  // Here you would typically send the data to your server
  // fetch('/submit-contact', { method: 'POST', body: formData })
})

// Alert system for form feedback
function showAlert(message, type = "info") {
  // Remove existing alerts
  const existingAlert = document.querySelector(".alert")
  if (existingAlert) {
    existingAlert.remove()
  }

  // Create alert element
  const alert = document.createElement("div")
  alert.className = `alert alert-${type}`
  alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "var(--primary)" : "var(--destructive)"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--comic-panel-shadow);
        z-index: 1001;
        font-weight: 600;
        animation: slideInRight 0.3s ease-out;
    `
  alert.textContent = message

  // Add slide-in animation
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `
  document.head.appendChild(style)

  document.body.appendChild(alert)

  // Auto-remove after 5 seconds
  setTimeout(() => {
    alert.style.animation = "slideInRight 0.3s ease-out reverse"
    setTimeout(() => alert.remove(), 300)
  }, 5000)
}

// Add bounce effect to skill badges on hover
document.querySelectorAll(".skill-badge").forEach((badge) => {
  badge.addEventListener("mouseenter", () => {
    badge.style.animation = "bounce 0.6s ease-out"
  })

  badge.addEventListener("animationend", () => {
    badge.style.animation = ""
  })
})

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  if (hero && scrolled < window.innerHeight) {
    // Only apply parallax when hero is visible and limit the effect
    const parallaxSpeed = 0.3
    const maxTransform = 100 // Limit maximum transform
    const transform = Math.min(scrolled * parallaxSpeed, maxTransform)
    hero.style.transform = `translateY(${transform}px)`
  }
})

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    // Uncomment the line below to enable typing effect
    // typeWriter(heroTitle, originalText, 150);
  }
})
