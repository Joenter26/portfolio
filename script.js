// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });

            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Subject field popup functionality
const subjectField = document.getElementById('subject');
const subjectPopup = document.getElementById('subject-popup');
const selectProjectBtn = document.getElementById('select-project');

if (subjectField && subjectPopup) {
    subjectField.addEventListener('click', function() {
        subjectPopup.style.display = 'block';
    });

    subjectField.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            subjectPopup.style.display = 'block';
            e.preventDefault();
        }
    });

    subjectField.addEventListener('focus', function() {
        subjectPopup.style.display = 'block';
    });

    document.addEventListener('click', function(event) {
        if (!subjectField.contains(event.target) && !subjectPopup.contains(event.target)) {
            subjectPopup.style.display = 'none';
        }
    });
}

// Select project type functionality
if (selectProjectBtn) {
    selectProjectBtn.addEventListener('click', function() {
        const selectedProject = document.querySelector('input[name="project-type"]:checked');
        if (selectedProject) {
            subjectField.value = selectedProject.value;
            subjectPopup.style.display = 'none';
        } else {
            alert('Please select a project type');
        }
    });
}

// FORM SUBMISSION — NOW CONNECTED TO REAL BACKEND
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    const date = new Date().toISOString();

    // Basic frontend validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    const contactData = { name, email, subject, message, date };

    try {
      const response = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });

      if (response.ok) {
        formSuccess.classList.remove('hidden');
        contactForm.reset();
        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 5000);
      } else {
        alert('❌ Backend error.');
      }
    } catch (err) {
      alert('❌ Cannot connect to backend. Is it running?');
      console.error(err);
    }
  });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.project-card, #about > div, #contact > div');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
    if (e.key === 'Escape' && subjectPopup && subjectPopup.style.display === 'block') {
        subjectPopup.style.display = 'none';
    }
});

// Image preload (optional)
function preloadImages() {
    const imageUrls = [
        // Add image URLs if needed
    ];
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}
window.addEventListener('load', preloadImages);
