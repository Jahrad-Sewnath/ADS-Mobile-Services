// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Basic validation
            if (!data.name || !data.phone || !data.address || !data.vehicle) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Phone number validation
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            const cleanPhone = data.phone.replace(/\D/g, '');
            if (cleanPhone.length < 10) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            
            // FORMSPREE SUBMISSION)
            // try {
            //     let response = await fetch(contactForm.action, {
            //         method: "POST",
            //         body: formData,
            //         headers: { 'Accept': 'application/json' }
            //     });

            //     if (response.ok) {
            //         showFormSuccess();
            //         contactForm.reset();
            //     } else {
            //         alert("⚠️ Something went wrong. Please try again.");
            //     }
            // } catch (err) {
            //     console.error(err);
            //     alert("⚠️ Could not send your request. Please check your connection.");
            // }

            // MAILTO SUBMISSION
            const name = document.getElementById("name").value;
            const phone = document.getElementById("phone").value;
            const email = document.getElementById("email").value;
            const address = document.getElementById("address").value;
            const vehicle = document.getElementById("vehicle").value;
            const service = document.getElementById("service").value;
            const urgency = document.getElementById("urgency").value;
            const message = document.getElementById("message").value;

            const mailtoLink = `mailto:jahradsewnath@gmail.com
            ?subject=${encodeURIComponent("New Quote Request - QuickFix Mobile")}
            &body=${encodeURIComponent(
                `Full Name: ${name}
                Phone: ${phone}
                Email: ${email}
                Service Address: ${address}
                Vehicle: ${vehicle}
                Service Needed: ${service}
                Urgency: ${urgency}
                Additional Details:
                ${message}`
            )}`;

            window.location.href = mailtoLink;


            // Show success message
            showFormSuccess();

        });

    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Skip for external links and tel/mailto links
            if (this.href && (this.href.startsWith('tel:') || this.href.startsWith('mailto:') || this.href.startsWith('http'))) {
                return;
            }
            
            // Add loading state for form submissions and internal navigation
            if (this.type === 'submit' || this.closest('form')) {
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                
                // Reset after 3 seconds (in case form validation fails)
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                }, 3000);
            }
        });
    });

    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks2 = document.querySelectorAll('.nav-link');
    navLinks2.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Add scroll effect to navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add fade-in animation for feature cards
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

    // Observe all cards for animation
    const cards = document.querySelectorAll('.feature-card, .service-item, .service-card, .value-item, .team-member');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Form success handler
function showFormSuccess() {
    const form = document.getElementById('contactForm');
    const originalHTML = form.innerHTML;
    
    form.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #28a745;">
            <h3>✅ Quote Request Sent Successfully!</h3>
            <p>Thank you for contacting QuickFix Mobile Mechanics. We'll get back to you within 2 hours with a free quote.</p>
            <p><strong>Need immediate service?</strong></p>
            <a href="tel:+1234567890" class="btn btn-primary">Call (123) 456-7890</a>
        </div>
    `;
    
    // Reset form after 5 seconds
    setTimeout(() => {
        form.innerHTML = originalHTML;
        // Re-attach event listener
        const newForm = document.getElementById('contactForm');
        if (newForm) {
            newForm.addEventListener('submit', arguments.callee);
        }
    }, 5000);
}

// Phone number formatting
function formatPhoneNumber(input) {
    const value = input.value.replace(/\D/g, '');
    const match = value.match(/^(\d{3})(\d{3})(\d{4})$/);
    
    if (match) {
        input.value = `(${match[1]}) ${match[2]}-${match[3]}`;
    }
}

// Add phone formatting to phone input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
});

// Emergency service banner (optional - can be activated during emergencies)
function showEmergencyBanner() {
    const banner = document.createElement('div');
    banner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #dc3545;
        color: white;
        text-align: center;
        padding: 10px;
        z-index: 1001;
        font-weight: bold;
    `;
    banner.innerHTML = '🚨 Emergency Service Available 24/7 - Call (123) 456-7890';
    
    document.body.prepend(banner);
    document.querySelector('.navbar').style.top = '40px';
}

// Service area checker (basic implementation)
function checkServiceArea(zipCode) {
    // This would typically connect to a real service area database
    const serviceZips = ['12345', '12346', '12347', '12348', '12349'];
    return serviceZips.includes(zipCode);
}

// Price calculator helper
function estimateServicePrice(serviceType, vehicleYear) {
    const basePrices = {
        'oil-change': 49,
        'brake-service': 149,
        'battery': 99,
        'diagnostics': 89,
        'tire-service': 25,
        'maintenance': 79
    };
    
    const basePrice = basePrices[serviceType] || 100;
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - parseInt(vehicleYear);
    
    // Older vehicles might need more work
    const ageMultiplier = vehicleAge > 10 ? 1.2 : 1.0;
    
    return Math.round(basePrice * ageMultiplier);
}

// Auto-populate form fields from URL parameters (for marketing campaigns)
function populateFormFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const fields = ['service', 'urgency'];
    
    fields.forEach(field => {
        const value = urlParams.get(field);
        const input = document.getElementById(field);
        if (value && input) {
            input.value = value;
        }
    });
}

// Call this on page load
document.addEventListener('DOMContentLoaded', populateFormFromURL);