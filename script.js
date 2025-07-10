/* CSS for Personal Stackfolio Website */
        /* // DOM Elements */
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const themeToggle = document.getElementById('themeToggle');
        const skillProgressBars = document.querySelectorAll('.skill-progress');
        const header = document.querySelector('header');
        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('form-status');

        /* // Mobile Navigation Toggle */
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        /* // Close mobile menu when clicking a link */
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        /* // Theme Toggle */
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
        });

        /* // Animate skill bars when in viewStack */
        const animateSkills = () => {
            skillProgressBars.forEach(bar => {
                const rect = bar.getBoundingClientRect();
                const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);

                if (isVisible && !bar.getAttribute('data-animated')) {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                    bar.setAttribute('data-animated', 'true');
                }
            });
        };

        /* // Header scroll effect */
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            animateSkills();
        });

        // Initialize animations
        window.addEventListener('DOMContentLoaded', () => {
            animateSkills();
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        /* // Fixed Contact Form Submission with Google Sheets */
        const form = document.getElementById('contactForm');
        const statusDiv = document.getElementById('form-status');

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // === ✅ Form Validation ===
            if (!name || !email || !message) {
                statusDiv.textContent = "Please fill in all required fields.";
                statusDiv.style.color = "red";
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                statusDiv.textContent = "Please enter a valid email address.";
                statusDiv.style.color = "red";
                return;
            }

            if (message.length < 10) {
                statusDiv.textContent = "Message must be at least 10 characters long.";
                statusDiv.style.color = "red";
                return;
            }

            /* // const timestamp = new Date().toISOString(); */
            const data = { name, email, message };


            fetch('https://script.google.com/macros/s/AKfycbxk-xmPCiL4MSEgGFPlLtEQHnUVHdKECqCMpRpZIY0qSH7QHepku960rsfl4VQMfDYsoA/exec', {
                method: 'POST',
                mode: 'no-cors', // required for localhost
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(() => {
                    statusDiv.textContent = "Message sent successfully!";
                    statusDiv.style.color = "green";
                    form.reset();
                })
                .catch(error => {
                    statusDiv.textContent = "Something went wrong. Try again.";
                    statusDiv.style.color = "red";
                });
        });