document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Navigation ---
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('nav-active');
      
      // Toggle icon
      const icon = hamburger.querySelector('i');
      if (navLinks.classList.contains('nav-active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
          navLinks.classList.remove('nav-active');
          const icon = hamburger.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // --- Active Page Highlighting ---
  const currentLocation = window.location.pathname.split('/').pop();
  const menuLinks = document.querySelectorAll('.nav-link');
  
  menuLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    // If we're on the root path and the link is index.html
    if (currentLocation === '' && linkHref === 'index.html') {
      link.classList.add('active');
    } 
    // Otherwise check exact match
    else if (currentLocation === linkHref) {
      link.classList.add('active');
    }
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Only animate once
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

});
