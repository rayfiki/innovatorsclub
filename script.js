// Gallery Preview Section (Home Page)
(function() {
  'use strict';

  const galleryPreviewSection = document.querySelector('.gallery-preview-section');
  if (!galleryPreviewSection) return;

  // Get projects data if available
  const projects = window.projectsData || [
    {
      id: 1,
      title: "Smart Campus Navigation",
      description: "An augmented reality app that helps students navigate the campus with real-time updates and interactive guides.",
      tags: ["AR/VR", "Mobile App", "Navigation"],
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 2,
      title: "Eco-Friendly Energy Harvesting",
      description: "A system that captures kinetic energy from foot traffic to power campus lighting and charging stations.",
      tags: ["Sustainability", "Engineering", "Renewable Energy"],
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 3,
      title: "AI Learning Assistant",
      description: "An intelligent tutoring system that adapts to individual learning styles and provides personalized feedback.",
      tags: ["AI", "Education", "Machine Learning"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 4,
      title: "Virtual Science Lab",
      description: "An immersive VR environment where students can conduct experiments safely and access rare equipment.",
      tags: ["VR", "Education", "Simulation"],
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#"
    }
  ];

  const galleryPreviewGrid = document.getElementById('gallery-preview-grid');
  if (!galleryPreviewGrid) return;

  // Show first 4 projects as preview
  const previewProjects = projects.slice(0, 4);

  previewProjects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'gallery-preview-card';
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="gallery-preview-image" loading="lazy">
      <div class="gallery-preview-content">
        <h3 class="gallery-preview-title">${project.title}</h3>
        <p class="gallery-preview-description">${project.description}</p>
        <div class="gallery-preview-tags">
          ${project.tags.slice(0, 2).map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    `;
    galleryPreviewGrid.appendChild(card);
  });
})();

// About Section Animations
(function() {
  'use strict';

  const aboutSection = document.querySelector('.about-section');
  if (!aboutSection) return;

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = [
    ...aboutSection.querySelectorAll('.about-hero'),
    ...aboutSection.querySelectorAll('.mission-vision-card'),
    ...aboutSection.querySelectorAll('.value-card'),
    ...aboutSection.querySelectorAll('.stat-card'),
    ...aboutSection.querySelectorAll('.story-content')
  ];

  animatedElements.forEach((element, index) => {
    // Add delay based on index for staggered animations
    element.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(element);
  });

  // Animated number counter function
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps

    const updateCounter = () => {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  // Counter observer - only animate when stat card is visible
  const statCards = aboutSection.querySelectorAll('.stat-card');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector('.stat-number');
        const target = parseInt(statNumber.getAttribute('data-target'));
        
        if (statNumber && !statNumber.hasAttribute('data-animated')) {
          statNumber.setAttribute('data-animated', 'true');
          animateCounter(statNumber, target);
        }
        
        counterObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statCards.forEach(card => {
    counterObserver.observe(card);
  });
})();

// Contact Section Animations
(function() {
  'use strict';

  const contactSection = document.querySelector('.contact-section');
  if (!contactSection) return;

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe contact hero
  const contactHero = contactSection.querySelector('.contact-hero');
  if (contactHero) {
    contactHero.style.transitionDelay = '0s';
    observer.observe(contactHero);
  }

  // Observe contact cards with staggered delays
  const contactCards = contactSection.querySelectorAll('.contact-card');
  contactCards.forEach((card, index) => {
    card.style.transitionDelay = `${0.2 + index * 0.15}s`;
    observer.observe(card);
  });

  // Observe social link cards with staggered delays
  const socialCards = contactSection.querySelectorAll('.social-link-card');
  socialCards.forEach((card, index) => {
    card.style.transitionDelay = `${0.8 + index * 0.1}s`;
    observer.observe(card);
  });
})();

// Full Gallery Page
(function() {
  'use strict';

  const gallerySection = document.querySelector('.gallery-section');
  if (!gallerySection) return;

  // Extended project data with team information
  const projects = [
    {
      id: 1,
      title: "Smart Campus Navigation",
      description: "An augmented reality app that helps students navigate the campus with real-time updates and interactive guides.",
      longDescription: "Smart Campus Navigation is a cutting-edge augmented reality application designed to revolutionize how students interact with their campus environment. The app uses advanced AR technology combined with real-time location data to provide intuitive navigation, interactive building information, and personalized campus experiences. Built with cross-platform compatibility, it supports both iOS and Android devices, ensuring accessibility for all students. The project includes features like virtual tour guides, event notifications, and accessibility information for different campus locations.",
      category: "tech",
      tags: ["AR/VR", "Mobile App", "Navigation"],
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      technologies: ["React Native", "ARKit", "Firebase", "Google Maps API"],
      team: [
        { name: "Alex Chen", role: "Lead Developer" },
        { name: "Sarah Martinez", role: "UI/UX Designer" },
        { name: "Michael Park", role: "Backend Engineer" },
        { name: "Emily Johnson", role: "QA Specialist" }
      ],
      year: 2024
    },
    {
      id: 2,
      title: "Eco-Friendly Energy Harvesting",
      description: "A system that captures kinetic energy from foot traffic to power campus lighting and charging stations.",
      longDescription: "This innovative energy harvesting system transforms pedestrian foot traffic into usable electrical energy. Utilizing piezoelectric technology embedded in walkways and high-traffic areas, the system captures the kinetic energy generated by thousands of daily footsteps. The harvested energy is stored in efficient battery systems and distributed to power LED lighting fixtures, USB charging stations, and information displays across campus. This project demonstrates a sustainable approach to renewable energy, reducing campus carbon footprint while providing practical utilities for students. The system includes real-time energy monitoring dashboards accessible via web and mobile applications.",
      category: "engineering",
      tags: ["Sustainability", "Engineering", "Renewable Energy"],
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      technologies: ["Python", "IoT Sensors", "Energy Management Systems", "React"],
      team: [
        { name: "David Kim", role: "Project Lead" },
        { name: "Jessica Wu", role: "Electrical Engineer" },
        { name: "Ryan Thompson", role: "Software Developer" },
        { name: "Lisa Anderson", role: "Sustainability Consultant" }
      ],
      year: 2023
    },
    {
      id: 3,
      title: "AI Learning Assistant",
      description: "An intelligent tutoring system that adapts to individual learning styles and provides personalized feedback.",
      longDescription: "The AI Learning Assistant is a comprehensive educational platform powered by machine learning algorithms that personalize the learning experience for each student. The system analyzes learning patterns, identifies knowledge gaps, and provides targeted recommendations for improvement. It offers interactive tutoring sessions, adaptive practice problems, and detailed performance analytics. The assistant can answer questions in real-time, explain complex concepts in multiple ways, and track student progress over time. Built with natural language processing capabilities, it understands student queries and provides contextually relevant responses. The platform supports various subjects and integrates seamlessly with existing learning management systems.",
      category: "education",
      tags: ["AI", "Education", "Machine Learning"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      technologies: ["TensorFlow", "Python", "Natural Language Processing", "Flask", "React"],
      team: [
        { name: "Robert Singh", role: "AI Engineer" },
        { name: "Maya Patel", role: "Machine Learning Specialist" },
        { name: "Daniel Lee", role: "Full Stack Developer" },
        { name: "Olivia Brown", role: "Educational Content Designer" }
      ],
      year: 2024
    },
    {
      id: 4,
      title: "Virtual Science Lab",
      description: "An immersive VR environment where students can conduct experiments safely and access rare equipment.",
      longDescription: "Virtual Science Lab provides an immersive virtual reality platform for conducting scientific experiments without physical constraints or safety concerns. Students can perform complex experiments using virtual equipment, manipulate molecular structures in 3D space, and explore scientific concepts through interactive simulations. The lab includes realistic physics engines, accurate chemical reaction simulations, and detailed equipment that mirrors real-world laboratory tools. This solution addresses accessibility challenges by allowing students to conduct experiments regardless of location or resource availability. The platform supports collaborative experiments where multiple students can work together in the same virtual space.",
      category: "education",
      tags: ["VR", "Education", "Simulation"],
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      technologies: ["Unity", "Oculus SDK", "C#", "VR Physics Engine"],
      team: [
        { name: "Chris Rodriguez", role: "VR Developer" },
        { name: "Amanda White", role: "3D Artist" },
        { name: "Kevin Chang", role: "Physics Simulation Engineer" },
        { name: "Sophia Garcia", role: "UI/UX Designer" }
      ],
      year: 2023
    },
    {
      id: 5,
      title: "Community Food Sharing Platform",
      description: "A digital platform connecting local food donors with community organizations to reduce food waste.",
      longDescription: "The Community Food Sharing Platform is a comprehensive web and mobile application that connects food donors (restaurants, grocery stores, cafeterias) with local community organizations (food banks, shelters, community centers). The platform streamlines the donation process through automated scheduling, real-time notifications, and route optimization for food pickup. It includes features for inventory management, expiration tracking, and nutritional information sharing. The platform has significantly reduced food waste in the community while ensuring fresh, nutritious meals reach those in need. Analytics dashboards help track impact metrics and optimize donation logistics.",
      category: "social-good",
      tags: ["Social Good", "Web Platform", "Sustainability"],
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Node.js", "PostgreSQL", "Mapbox API", "Mobile App"],
      team: [
        { name: "Jordan Taylor", role: "Project Manager" },
        { name: "Sam Wilson", role: "Backend Developer" },
        { name: "Taylor Moore", role: "Frontend Developer" },
        { name: "Casey Adams", role: "Community Coordinator" }
      ],
      year: 2024
    },
    {
      id: 6,
      title: "Sustainable Design Studio",
      description: "An interactive design tool that helps create eco-friendly products using sustainable materials and processes.",
      longDescription: "Sustainable Design Studio is a comprehensive CAD application integrated with a materials database focused on sustainability metrics. Designers can explore different materials, compare environmental impacts, and receive recommendations for eco-friendly alternatives. The tool includes life-cycle assessment features, carbon footprint calculators, and supply chain transparency tools. It supports collaboration features allowing teams to work together on sustainable design projects. The platform has been adopted by multiple design programs and has helped reduce environmental impact in product development processes.",
      category: "design",
      tags: ["Design", "Sustainability", "CAD"],
      image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Three.js", "WebGL", "Node.js", "MongoDB"],
      team: [
        { name: "Riley Martinez", role: "Design Lead" },
        { name: "Quinn Johnson", role: "Frontend Developer" },
        { name: "Avery Chen", role: "Backend Engineer" },
        { name: "Morgan Lee", role: "Sustainability Analyst" }
      ],
      year: 2023
    },
    {
      id: 7,
      title: "Automated Greenhouse System",
      description: "An IoT-powered greenhouse management system that monitors and controls environmental conditions automatically.",
      longDescription: "This automated greenhouse system uses IoT sensors and machine learning to optimize growing conditions for various crops. The system monitors temperature, humidity, soil moisture, light levels, and nutrient concentrations in real-time. Machine learning algorithms analyze data patterns to predict optimal watering schedules, nutrient adjustments, and harvest timing. The platform includes automated irrigation, climate control, and alert systems for any anomalies. Farmers can monitor and control the greenhouse remotely through mobile and web applications. The system has demonstrated significant improvements in crop yield and resource efficiency.",
      category: "engineering",
      tags: ["IoT", "Engineering", "Agriculture"],
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Arduino", "Raspberry Pi", "Python", "TensorFlow", "React"],
      team: [
        { name: "Blake Williams", role: "Hardware Engineer" },
        { name: "Hayden Davis", role: "Software Developer" },
        { name: "River Anderson", role: "ML Engineer" },
        { name: "Skyler Thompson", role: "Agricultural Specialist" }
      ],
      year: 2024
    },
    {
      id: 8,
      title: "Smart City Traffic Optimization",
      description: "An AI-powered traffic management system that reduces congestion and improves urban mobility.",
      longDescription: "Smart City Traffic Optimization leverages computer vision, machine learning, and real-time data analytics to optimize traffic flow in urban environments. The system analyzes traffic patterns from multiple sources including cameras, sensors, and GPS data from vehicles. It provides dynamic traffic light timing, suggests optimal routes to drivers, and predicts congestion before it occurs. The platform integrates with city infrastructure and can communicate with connected vehicles. Early deployments have shown reductions in average commute times and improved air quality in urban areas.",
      category: "tech",
      tags: ["AI", "Smart City", "Traffic Management"],
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Computer Vision", "TensorFlow", "Kafka", "Docker", "Kubernetes"],
      team: [
        { name: "Cameron Scott", role: "AI Engineer" },
        { name: "Dakota Green", role: "Data Scientist" },
        { name: "Phoenix Brown", role: "DevOps Engineer" },
        { name: "Sage Taylor", role: "Systems Architect" }
      ],
      year: 2024
    }
  ];

  const galleryGrid = document.getElementById('gallery-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.querySelector('.modal-close');

  let currentFilter = 'all';
  let lastFocusedElement = null;

  // Category mapping
  const categoryMap = {
    'all': 'all',
    'tech': 'tech',
    'design': 'design',
    'engineering': 'engineering',
    'sustainability': 'sustainability',
    'education': 'education',
    'social-good': 'social-good'
  };

  // Render project cards
  function renderProjects(filterCategory = 'all') {
    if (!galleryGrid) return;

    const filteredProjects = filterCategory === 'all' 
      ? projects 
      : projects.filter(p => p.category === filterCategory);

    galleryGrid.innerHTML = '';

    filteredProjects.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.setAttribute('role', 'article');
      card.setAttribute('aria-label', project.title);
      card.tabIndex = 0;
      
      const teamPreview = project.team.slice(0, 2).map(member => member.name).join(', ');
      const teamCount = project.team.length > 2 ? ` +${project.team.length - 2} more` : '';

      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="gallery-card-image" loading="lazy">
        <div class="gallery-card-content">
          <div class="gallery-card-category">${project.category.charAt(0).toUpperCase() + project.category.slice(1).replace('-', ' ')}</div>
          <h3 class="gallery-card-title">${project.title}</h3>
          <p class="gallery-card-description">${project.description}</p>
          <div class="gallery-card-team">
            <span class="team-icon">👥</span>
            <span class="team-names">${teamPreview}${teamCount}</span>
          </div>
          <div class="gallery-card-tags">
            ${project.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <button class="gallery-card-btn" aria-label="View details for ${project.title}">View Details</button>
        </div>
      `;

      // Add click handler
      const viewBtn = card.querySelector('.gallery-card-btn');
      const clickHandler = () => openModal(project);
      
      viewBtn.addEventListener('click', clickHandler);
      card.addEventListener('click', (e) => {
        if (e.target !== viewBtn && !viewBtn.contains(e.target)) {
          clickHandler();
        }
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          clickHandler();
        }
      });

      // Add animation delay
      card.style.animationDelay = `${index * 0.1}s`;
      galleryGrid.appendChild(card);
    });
  }

  // Open modal
  function openModal(project) {
    if (!modalOverlay || !modalContent) return;

    lastFocusedElement = document.activeElement;

    modalContent.innerHTML = `
      <div class="modal-image-container">
        <img src="${project.image}" alt="${project.title}" class="modal-image">
      </div>
      <div class="modal-body">
        <div class="modal-header">
          <div class="modal-category">${project.category.charAt(0).toUpperCase() + project.category.slice(1).replace('-', ' ')}</div>
          <h2 class="modal-title" id="modal-title">${project.title}</h2>
          ${project.year ? `<div class="modal-year">${project.year}</div>` : ''}
        </div>
        <div class="modal-description">
          <p>${project.longDescription}</p>
        </div>
        <div class="modal-section">
          <h3 class="modal-section-title">Team Members</h3>
          <div class="modal-team">
            ${project.team.map(member => `
              <div class="modal-team-member">
                <span class="team-member-name">${member.name}</span>
                <span class="team-member-role">${member.role}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="modal-section">
          <h3 class="modal-section-title">Technologies</h3>
          <div class="modal-technologies">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        </div>
        <div class="modal-section">
          <h3 class="modal-section-title">Categories</h3>
          <div class="modal-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    modalOverlay.setAttribute('aria-hidden', 'false');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus trap
    const focusableElements = modalOverlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (firstElement) {
      setTimeout(() => firstElement.focus(), 100);
    }

    // Keyboard navigation
    const handleTab = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    modalOverlay.addEventListener('keydown', handleTab);
    modalOverlay._tabHandler = handleTab;
  }

  // Close modal
  function closeModal() {
    if (!modalOverlay) return;

    modalOverlay.setAttribute('aria-hidden', 'true');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';

    if (modalOverlay._tabHandler) {
      modalOverlay.removeEventListener('keydown', modalOverlay._tabHandler);
      delete modalOverlay._tabHandler;
    }

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // Filter functionality
  function handleFilter(category) {
    currentFilter = category;
    renderProjects(category);

    // Update filter buttons
    filterButtons.forEach(btn => {
      const btnCategory = btn.dataset.category;
      const isActive = btnCategory === category;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  // Event listeners
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = categoryMap[btn.dataset.category] || 'all';
      handleFilter(category);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // Initialize
  renderProjects('all');

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  setTimeout(() => {
    document.querySelectorAll('.gallery-card').forEach(card => {
      observer.observe(card);
    });
  }, 100);
})();

(function () {
  const nav = document.querySelector('.primary-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const dropdownParent = document.querySelector('.has-dropdown');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown');
  const overlay = document.querySelector('.nav-overlay');
  let lastFocusedElement = null;

  // Mobile menu toggle
  function setNavExpanded(expanded) {
    if (!nav) return;
    nav.setAttribute('aria-expanded', String(expanded));
    if (navToggle) navToggle.setAttribute('aria-expanded', String(expanded));
    if (navToggle) navToggle.classList.toggle('open', expanded);
    if (overlay) {
      if (expanded) {
        overlay.hidden = false;
        // trigger opacity transition on next frame
        requestAnimationFrame(() => overlay.classList.add('show'));
      } else {
        overlay.classList.remove('show');
        // wait for fade before hiding
        setTimeout(() => { overlay.hidden = true; }, 200);
      }
    }
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = nav.getAttribute('aria-expanded') === 'true';
      if (!expanded) {
        lastFocusedElement = document.activeElement;
      }
      setNavExpanded(!expanded);
      if (!expanded) {
        // focus first link when opening on small screens
        const firstLink = document.querySelector('.nav-list a');
        if (firstLink) firstLink.focus({ preventScroll: true });
      } else if (lastFocusedElement) {
        // restore focus back to toggle
        navToggle.focus({ preventScroll: true });
      }
    });
  }

  // Dropdown toggle
  function closeDropdown() {
    if (!dropdownParent) return;
    dropdownParent.classList.remove('open');
    if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'false');
  }

  function openDropdown() {
    if (!dropdownParent) return;
    dropdownParent.classList.add('open');
    if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'true');
  }

  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdownParent.classList.contains('open');
      isOpen ? closeDropdown() : openDropdown();
    });
  }

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!dropdownParent) return;
    if (!dropdownParent.contains(e.target)) closeDropdown();
  });

  // Close menus on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDropdown();
      setNavExpanded(false);
    }
  });

  // Close when clicking the backdrop
  if (overlay) {
    overlay.addEventListener('click', () => setNavExpanded(false));
  }
})();

// Projects Carousel
(function() {
  'use strict';

  // Only initialize if the projects section exists
  const projectsSection = document.querySelector('.projects-section');
  if (!projectsSection) return;

  // Project data with image URLs
  const projects = [
    {
      id: 1,
      title: "Smart Campus Navigation",
      description: "An augmented reality app that helps students navigate the campus with real-time updates and interactive guides.",
      tags: ["AR/VR", "Mobile App", "Navigation"],
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 2,
      title: "Eco-Friendly Energy Harvesting",
      description: "A system that captures kinetic energy from foot traffic to power campus lighting and charging stations.",
      tags: ["Sustainability", "Engineering", "Renewable Energy"],
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 3,
      title: "AI Learning Assistant",
      description: "An intelligent tutoring system that adapts to individual learning styles and provides personalized feedback.",
      tags: ["AI", "Education", "Machine Learning"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 4,
      title: "Virtual Science Lab",
      description: "An immersive VR environment where students can conduct experiments safely and access rare equipment.",
      tags: ["VR", "Education", "Simulation"],
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 5,
      title: "Community Food Sharing Platform",
      description: "A digital platform connecting local food donors with community organizations to reduce food waste.",
      tags: ["Social Good", "Web Platform", "Sustainability"],
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#"
    }
  ];

  const carouselTrack = document.querySelector('.carousel-track');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (!carouselTrack || !indicatorsContainer || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  let autoSlideInterval;
  let isPaused = false;

  // Create project cards
  projects.forEach((project, index) => {
    // Create card element
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', project.title);
    
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="card-image" loading="lazy">
      <div class="card-content">
        <div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
        </div>
        <div>
          <div class="project-tags" role="list">
            ${project.tags.map(tag => `<span class="tag" role="listitem">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
    
    carouselTrack.appendChild(card);

    // Create indicator
    const indicator = document.createElement('button');
    indicator.className = 'indicator';
    indicator.setAttribute('aria-label', `Go to project ${index + 1}`);
    indicator.setAttribute('aria-current', index === 0 ? 'true' : 'false');
    indicator.dataset.index = index;
    indicator.addEventListener('click', () => {
      goToSlide(index);
    });
    indicatorsContainer.appendChild(indicator);
  });

  const cards = document.querySelectorAll('.project-card');
  const indicators = document.querySelectorAll('.indicator');

  // Initialize carousel
  function initCarousel() {
    updateCarousel();
    startAutoSlide();
  }

  // Update carousel display with zoom and slide animations
  function updateCarousel() {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    
    cards.forEach((card, index) => {
      // Remove all animation classes first
      card.classList.remove('active', 'prev');
      
      if (index === currentIndex) {
        // Add active class to trigger slide-in and zoom-in animation
        // Use requestAnimationFrame to ensure class removal happens before adding
        requestAnimationFrame(() => {
          card.classList.add('active');
        });
      } else if (index === prevIndex) {
        // Mark previous card for exit animation
        requestAnimationFrame(() => {
          card.classList.add('prev');
        });
      }
    });

    indicators.forEach((indicator, index) => {
      const isActive = index === currentIndex;
      indicator.classList.toggle('active', isActive);
      indicator.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    if (index < 0 || index >= projects.length) return;
    currentIndex = index;
    updateCarousel();
    resetAutoSlide();
  }

  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % projects.length;
    updateCarousel();
    resetAutoSlide();
  }

  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    updateCarousel();
    resetAutoSlide();
  }

  // Start auto slide with 4 second interval
  function startAutoSlide() {
    if (isPaused) return;
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 2000); // Auto-rotate every 4 seconds
  }

  // Reset auto slide timer
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    if (!isPaused) {
      startAutoSlide();
    }
  }

  // Stop auto slide
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    isPaused = true;
  }

  // Resume auto slide
  function resumeAutoSlide() {
    isPaused = false;
    startAutoSlide();
  }

  // Event listeners for navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  // Initialize the carousel
  initCarousel();

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    const rect = projectsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (!isVisible) return;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      resetAutoSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      resetAutoSlide();
    }
  });

  // Export projects data for use in other modules
  window.projectsData = projects;

  // Pause auto-slide on hover
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      stopAutoSlide();
    });

    carouselContainer.addEventListener('mouseleave', () => {
      resumeAutoSlide();
    });

    // Pause on focus (accessibility)
    carouselContainer.addEventListener('focusin', () => {
      stopAutoSlide();
    });

    carouselContainer.addEventListener('focusout', () => {
      resumeAutoSlide();
    });
  }

  // Pause when page is not visible (Tab switching)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      resumeAutoSlide();
    }
  });
})();

// Events & Timeline Section
(function() {
  'use strict';

  // Only initialize if the events section exists
  const eventsSection = document.querySelector('.events-section');
  if (!eventsSection) return;

  // Event data structure
  const upcomingEvents = [
    {
      id: 1,
      date: new Date('2024-03-15'),
      title: "Innovation Hackathon 2024",
      description: "Join us for a 48-hour hackathon where teams will build innovative solutions to real-world challenges. Prizes, mentorship, and networking opportunities await!",
      registrationLink: "#register-hackathon",
      isRegistrationOpen: true
    },
    {
      id: 2,
      date: new Date('2024-03-28'),
      title: "AI & Machine Learning Workshop",
      description: "Learn the fundamentals of AI and ML from industry experts. Hands-on sessions with TensorFlow and practical projects to enhance your skills.",
      registrationLink: "#register-ai-workshop",
      isRegistrationOpen: true
    },
    {
      id: 3,
      date: new Date('2024-04-10'),
      title: "Startup Pitch Competition",
      description: "Showcase your innovative ideas to a panel of investors and entrepreneurs. Win funding, mentorship, and the chance to launch your startup.",
      registrationLink: "#register-pitch",
      isRegistrationOpen: true
    },
    {
      id: 4,
      date: new Date('2024-04-22'),
      title: "Tech Career Fair",
      description: "Connect with top tech companies and explore internship and job opportunities. Network with industry professionals and attend career development sessions.",
      registrationLink: "#register-career-fair",
      isRegistrationOpen: false
    }
  ];

  const pastEvents = [
    {
      id: 5,
      date: new Date('2024-02-10'),
      title: "Web Development Bootcamp",
      description: "Intensive 3-day workshop covering modern web development technologies including React, Node.js, and cloud deployment."
    },
    {
      id: 6,
      date: new Date('2024-01-20'),
      title: "Innovation Showcase 2024",
      description: "Annual showcase featuring student projects, innovations, and achievements. Over 50 projects displayed with networking and awards ceremony."
    },
    {
      id: 7,
      date: new Date('2023-12-15'),
      title: "Winter Coding Challenge",
      description: "Competitive coding event with algorithmic challenges and problem-solving sessions. Winners received prizes and recognition."
    }
  ];

  const upcomingEventsContainer = document.getElementById('upcoming-events');
  const pastEventsContainer = document.getElementById('past-events');
  const pastEventsToggle = document.getElementById('past-events-toggle');
  const pastEventsContent = document.getElementById('past-events-list');

  // Format date for display
  function formatDate(date) {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return { day, month };
  }

  // Create event card HTML
  function createEventCard(event, isPast = false) {
    const { day, month } = formatDate(event.date);
    const badgeClass = isPast ? 'event-date-badge past' : 'event-date-badge';
    
    let registerButton = '';
    if (!isPast) {
      if (event.isRegistrationOpen) {
        registerButton = `<a href="${event.registrationLink}" class="event-register-btn">Register Now</a>`;
      } else {
        registerButton = `<button class="event-register-btn" disabled>Coming Soon</button>`;
      }
    }

    return `
      <div class="timeline-item" data-event-id="${event.id}">
        <div class="${badgeClass}">
          <span class="date-day">${day}</span>
          <span class="date-month">${month}</span>
        </div>
        <div class="event-card">
          <h3 class="event-title">${event.title}</h3>
          <p class="event-description">${event.description}</p>
          ${registerButton}
        </div>
      </div>
    `;
  }

  // Render events
  function renderEvents() {
    if (upcomingEventsContainer) {
      upcomingEventsContainer.innerHTML = upcomingEvents.map(event => createEventCard(event, false)).join('');
    }

    if (pastEventsContainer) {
      pastEventsContainer.innerHTML = pastEvents.map(event => createEventCard(event, true)).join('');
    }
  }

  // Intersection Observer for scroll animations
  function initScrollAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (!timelineItems.length) return;

    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 150);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    timelineItems.forEach(item => {
      observer.observe(item);
    });
  }

  // Handle past events toggle
  function initPastEventsToggle() {
    if (!pastEventsToggle || !pastEventsContent) return;

    pastEventsToggle.addEventListener('click', () => {
      const isExpanded = pastEventsToggle.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;

      pastEventsToggle.setAttribute('aria-expanded', String(newState));
      pastEventsContent.setAttribute('aria-hidden', String(!newState));
      
      const toggleText = pastEventsToggle.querySelector('.toggle-text');
      if (toggleText) {
        toggleText.textContent = newState ? 'Hide Past Events' : 'View Past Events';
      }

      // Trigger scroll animations when past events are expanded
      if (newState) {
        setTimeout(() => {
          initScrollAnimations();
        }, 100);
      }
    });
  }

  // Initialize
  renderEvents();
  initScrollAnimations();
  initPastEventsToggle();

  // Re-initialize animations if past events are expanded on page load (for testing)
  setTimeout(() => {
    initScrollAnimations();
  }, 500);
})();

// Team Showcase Section
(function() {
  'use strict';

  // Only initialize if the team section exists
  const teamSection = document.querySelector('.team-section');
  if (!teamSection) return;

  // Team member data
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      role: "Chairman",
      bio: "Dr. Mitchell brings over 15 years of experience in educational innovation and technology leadership. As Chairman, she spearheads our mission to empower students through hands-on learning experiences and cutting-edge projects. Her vision has transformed the club into a thriving hub of creativity and innovation.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      social: {
        linkedin: "https://linkedin.com/in/sarah-mitchell",
        twitter: "https://twitter.com/sarahmitchell",
        github: "https://github.com/sarahmitchell",
        instagram: "https://instagram.com/sarahmitchell"
      }
    },
    {
      id: 2,
      name: "James Chen",
      role: "Vice Chairman",
      bio: "James is a passionate advocate for student innovation and entrepreneurship. With a background in software engineering and startup mentorship, he guides our members in turning their ideas into reality. He leads our technical workshops and hackathons, inspiring the next generation of innovators.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      social: {
        linkedin: "https://linkedin.com/in/james-chen",
        twitter: "https://twitter.com/jameschen",
        github: "https://github.com/jameschen",
        instagram: "https://instagram.com/jameschen"
      }
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Secretary & Events Coordinator",
      bio: "Emily excels at bringing our community together through thoughtfully organized events and seamless communication. Her organizational skills and passion for innovation make her an invaluable member of our leadership team. She ensures every workshop, competition, and networking event runs flawlessly.",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      social: {
        linkedin: "https://linkedin.com/in/emily-rodriguez",
        twitter: "https://twitter.com/emilyrodriguez",
        github: "https://github.com/emilyrodriguez",
        instagram: "https://instagram.com/emilyrodriguez"
      }
    }
  ];

  const teamGrid = document.querySelector('.team-grid');
  if (!teamGrid) return;

  // Create social media icon SVG
  function getSocialIcon(platform) {
    const icons = {
      linkedin: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
      twitter: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
      github: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
      instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>'
    };
    return icons[platform] || '';
  }

  // Create member card HTML
  function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `${member.name} - ${member.role}`);
    
    const socialLinks = Object.entries(member.social)
      .filter(([_, url]) => url)
      .map(([platform, url]) => 
        `<a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link social-${platform}" aria-label="${platform} profile" title="${platform}">${getSocialIcon(platform)}</a>`
      )
      .join('');

    card.innerHTML = `
      <div class="member-photo-container">
        <img src="${member.photo}" alt="${member.name}" class="member-photo" loading="lazy">
      </div>
      <div class="member-info">
        <h3 class="member-name">${member.name}</h3>
        <p class="member-role">${member.role}</p>
        <div class="member-social">
          ${socialLinks}
        </div>
        <div class="member-bio">
          <p>${member.bio}</p>
        </div>
      </div>
    `;
    
    return card;
  }

  // Render team members
  function renderTeamMembers() {
    teamMembers.forEach(member => {
      const card = createMemberCard(member);
      teamGrid.appendChild(card);
    });
  }

  // Intersection Observer for scroll animations
  function initScrollAnimations() {
    const memberCards = document.querySelectorAll('.member-card');
    
    if (!memberCards.length) return;

    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 150);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    memberCards.forEach(card => {
      observer.observe(card);
    });
  }

  // Initialize
  renderTeamMembers();
  initScrollAnimations();
})();

// Testimonials Carousel
(function() {
  'use strict';

  // Only initialize if the testimonials section exists
  const testimonialsSection = document.querySelector('.testimonials-section');
  if (!testimonialsSection) return;

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      quote: "The Innovators Club has been an incredible journey for me. I've learned so much about teamwork, innovation, and turning ideas into reality. The mentorship I received helped me launch my first startup!",
      name: "Sarah Chen",
      role: "Student",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      quote: "As a teacher, I'm constantly amazed by the creativity and passion our students bring to their projects. The club provides the perfect environment for young minds to flourish and innovate.",
      name: "Dr. Michael Rodriguez",
      role: "Teacher",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      quote: "Joining this club was the best decision I made in college. The projects we work on are real-world problems, and the skills I've gained here are already opening doors for my career.",
      name: "James Park",
      role: "Student",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      quote: "The collaborative atmosphere here is unmatched. Students work together across disciplines, bringing diverse perspectives that lead to truly innovative solutions.",
      name: "Professor Emily Watson",
      role: "Teacher",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      quote: "I've participated in multiple hackathons and workshops through the club. Each event taught me something new, and I've built connections that will last a lifetime.",
      name: "Alex Thompson",
      role: "Student",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      quote: "Watching students grow from curious beginners to confident innovators is incredibly rewarding. The club creates leaders who will shape our future.",
      name: "Dr. Lisa Anderson",
      role: "Teacher",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const carouselTrack = document.querySelector('.testimonials-carousel-track');
  const indicatorsContainer = document.querySelector('.testimonials-indicators');
  const prevBtn = document.querySelector('.prev-testimonial-btn');
  const nextBtn = document.querySelector('.next-testimonial-btn');

  if (!carouselTrack || !indicatorsContainer || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  let autoSlideInterval;
  let isPaused = false;

  // Create testimonial cards
  testimonials.forEach((testimonial, index) => {
    // Create card element
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    if (index === 0) card.classList.add('active');
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `Testimonial from ${testimonial.name}`);
    
    card.innerHTML = `
      <div class="testimonial-card-content">
        <img src="${testimonial.photo}" alt="${testimonial.name}" class="testimonial-photo" loading="lazy">
        <p class="testimonial-quote">${testimonial.quote}</p>
        <h3 class="testimonial-name">${testimonial.name}</h3>
        <p class="testimonial-role">${testimonial.role}</p>
      </div>
    `;
    
    carouselTrack.appendChild(card);

    // Create indicator
    const indicator = document.createElement('button');
    indicator.className = 'testimonial-indicator';
    if (index === 0) indicator.classList.add('active');
    indicator.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    indicator.setAttribute('aria-current', index === 0 ? 'true' : 'false');
    indicator.dataset.index = index;
    indicator.addEventListener('click', () => {
      goToSlide(index);
    });
    indicatorsContainer.appendChild(indicator);
  });

  const cards = document.querySelectorAll('.testimonial-card');
  const indicators = document.querySelectorAll('.testimonial-indicator');

  // Initialize carousel
  function initCarousel() {
    updateCarousel();
    startAutoSlide();
  }

  // Update carousel display
  function updateCarousel() {
    // Find the previously active card
    const previousActiveCard = document.querySelector('.testimonial-card.active');
    
    if (previousActiveCard && previousActiveCard !== cards[currentIndex]) {
      // Add exit animation to the previous card
      previousActiveCard.classList.add('exit');
      previousActiveCard.classList.remove('active');
      
      // Immediately add active class to new card (it will slide in from right)
      requestAnimationFrame(() => {
        cards.forEach((card, index) => {
          card.classList.remove('active', 'exit');
          if (index === currentIndex) {
            card.classList.add('active');
          }
        });
      });
      
      // Clean up exit class after animation completes
      setTimeout(() => {
        previousActiveCard.classList.remove('exit');
      }, 500);
    } else {
      // Initial load or direct navigation
      cards.forEach((card, index) => {
        card.classList.remove('active', 'exit');
        if (index === currentIndex) {
          card.classList.add('active');
        }
      });
    }

    indicators.forEach((indicator, index) => {
      const isActive = index === currentIndex;
      indicator.classList.toggle('active', isActive);
      indicator.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    if (index < 0 || index >= testimonials.length) return;
    currentIndex = index;
    updateCarousel();
    resetAutoSlide();
  }

  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateCarousel();
    resetAutoSlide();
  }

  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateCarousel();
    resetAutoSlide();
  }

  // Start auto slide
  function startAutoSlide() {
    if (isPaused) return;
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 2000); // 4 seconds
  }

  // Reset auto slide timer
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    if (!isPaused) {
      startAutoSlide();
    }
  }

  // Stop auto slide
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    isPaused = true;
  }

  // Resume auto slide
  function resumeAutoSlide() {
    isPaused = false;
    startAutoSlide();
  }

  // Event listeners for navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  // Initialize the carousel
  initCarousel();

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Only handle if testimonials section is visible and in focus context
    const rect = testimonialsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (!isVisible) return;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      resetAutoSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      resetAutoSlide();
    }
  });

  // Pause auto-slide on hover
  const carouselContainer = document.querySelector('.testimonials-carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      stopAutoSlide();
    });

    carouselContainer.addEventListener('mouseleave', () => {
      resumeAutoSlide();
    });

    // Pause on focus (accessibility)
    carouselContainer.addEventListener('focusin', () => {
      stopAutoSlide();
    });

    carouselContainer.addEventListener('focusout', () => {
      resumeAutoSlide();
    });
  }

  // Pause when page is not visible (Tab switching)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      resumeAutoSlide();
    }
  });
})();

// FAQ Section
(function() {
  'use strict';

  const faqSection = document.querySelector('.faq-section');
  if (!faqSection) return;

  // FAQ data structure
  const faqData = [
    // Membership questions
    {
      id: 1,
      question: "What are the membership requirements?",
      answer: "Membership is open to all students who are passionate about innovation and technology. There are no specific prerequisites in terms of skills or experience. We welcome students from all backgrounds and academic disciplines who are eager to learn, collaborate, and create innovative solutions.",
      category: "membership"
    },
    {
      id: 2,
      question: "How do I apply for membership?",
      answer: "You can apply for membership by clicking the 'Join Now' button on our website. The application process is simple and includes basic information about yourself, your interests, and why you'd like to join the club. Applications are reviewed on a rolling basis, and you'll typically receive a response within 3-5 business days.",
      category: "membership"
    },
    {
      id: 3,
      question: "Are there different membership levels?",
      answer: "Yes, we offer three membership tiers: Free (Basic Access), Member (Full Benefits), and Leadership (Additional Perks). Each tier provides different levels of access to resources, workshops, events, and project opportunities. You can learn more about each tier in the Membership Benefits section.",
      category: "membership"
    },
    {
      id: 4,
      question: "Is there a membership fee?",
      answer: "The Free tier has no membership fee and provides basic access to blog articles, public events, and community discussions. The Member tier may have nominal fees that help support workshops, resources, and events. Leadership positions are by application and may include additional benefits. Contact us for specific pricing details.",
      category: "membership"
    },
    // Time commitment questions
    {
      id: 5,
      question: "How much time commitment is required?",
      answer: "The time commitment varies based on your membership level and participation choices. Free members can participate as little or as much as they want. Active members typically spend 5-8 hours per week on projects, meetings, and workshops. Leadership roles may require 10-15 hours per week. We understand that students have various commitments, so participation is flexible.",
      category: "time"
    },
    {
      id: 6,
      question: "Do I need to attend all meetings?",
      answer: "While regular attendance is encouraged for the best experience, we understand that schedules can be busy. There's no strict attendance requirement for general members. However, consistent attendance helps you stay updated on projects, workshops, and networking opportunities. Meeting recordings and summaries are available for members who can't attend in person.",
      category: "time"
    },
    {
      id: 7,
      question: "Are there strict deadlines for projects?",
      answer: "Project deadlines vary depending on the project type and scope. Some projects have flexible timelines that you can work on at your own pace, while competitions and hackathons have specific deadlines. Project leaders will communicate deadlines clearly at the start, and we always try to accommodate reasonable extension requests when needed.",
      category: "time"
    },
    {
      id: 8,
      question: "Can I participate if I have a busy academic schedule?",
      answer: "Absolutely! Many of our members balance club activities with heavy academic workloads. We offer flexible participation options, including asynchronous collaboration, weekend workshops, and virtual meeting options. You can choose projects and activities that fit your schedule and contribute at your own pace.",
      category: "time"
    },
    // Skill prerequisites questions
    {
      id: 9,
      question: "What skills are required to join?",
      answer: "No specific technical skills are required to join! We welcome beginners and experienced innovators alike. While having programming, design, or engineering skills can be helpful, we also value creativity, problem-solving abilities, teamwork, and enthusiasm. Many members learn new skills through our workshops and collaborative projects.",
      category: "skills"
    },
    {
      id: 10,
      question: "Is the club beginner-friendly?",
      answer: "Yes, absolutely! We're designed to be welcoming to beginners. We offer introductory workshops, mentorship programs, and beginner-friendly projects that help you learn and grow. Many of our most successful members started with little to no experience and developed their skills through club activities.",
      category: "skills"
    },
    {
      id: 11,
      question: "What learning resources are available?",
      answer: "We provide access to various learning resources including online tutorials, documentation, design tools, development environments, and coding platforms. Additionally, we host regular workshops covering topics from web development and UI/UX design to machine learning and hardware prototyping. Members also have access to our knowledge base and can request mentorship from experienced members.",
      category: "skills"
    },
    {
      id: 12,
      question: "Do I need prior project experience?",
      answer: "No prior project experience is necessary! Many members join without any previous project experience. We believe in learning by doing, and our collaborative environment is perfect for gaining hands-on experience. You'll work alongside more experienced members who can guide and mentor you through your first projects.",
      category: "skills"
    },
    // Project submission questions
    {
      id: 13,
      question: "How do I submit a project?",
      answer: "Projects can be submitted through our online portal (linked from the Projects section) or by contacting project coordinators directly. You'll need to provide project details, documentation, images/demos, team member information, and any relevant links or repositories. Our team reviews submissions to ensure they meet quality standards before showcasing them.",
      category: "projects"
    },
    {
      id: 14,
      question: "What are the project submission deadlines?",
      answer: "Project submission deadlines vary by project type. For ongoing innovation projects, you can submit at any time. For competitions, hackathons, or showcase events, specific deadlines will be announced well in advance (typically 2-4 weeks before the event). Always check the event details or contact organizers for specific deadline information.",
      category: "projects"
    },
    {
      id: 15,
      question: "What requirements must projects meet?",
      answer: "Projects should demonstrate innovation, creativity, and practical application. They must include proper documentation, be original work (or properly credited), and align with our club's values of collaboration and learning. Specific requirements may vary by project type, but generally include project description, technical details, team information, and visual materials.",
      category: "projects"
    },
    {
      id: 16,
      question: "How are projects reviewed?",
      answer: "Projects are reviewed by a panel of club leadership and experienced members. Review criteria include innovation, technical quality, documentation, impact, and presentation. The review process typically takes 1-2 weeks. You'll receive feedback on your project, and approved projects will be featured on our website and in showcases.",
      category: "projects"
    },
    // Meeting schedules questions
    {
      id: 17,
      question: "When are meetings held?",
      answer: "Regular meetings are typically held weekly on Tuesday evenings from 6:00 PM to 7:30 PM. We also have special workshops, project sessions, and events scheduled throughout the month. The exact schedule varies by semester and is communicated via email and our events calendar. All members receive meeting invitations and can RSVP accordingly.",
      category: "meetings"
    },
    {
      id: 18,
      question: "How often does the club meet?",
      answer: "The club holds weekly general meetings during the academic semester, with additional workshops, project sessions, and special events scheduled as needed. During exam periods or holidays, meeting frequency may be reduced. We typically meet 2-4 times per month, with optional activities available throughout the week.",
      category: "meetings"
    },
    {
      id: 19,
      question: "Where are meetings held?",
      answer: "Meetings are held in our designated innovation lab on campus (Room 205 in the Engineering Building), though locations may vary for special events. We also offer virtual meeting options for members who cannot attend in person. Meeting locations are always specified in meeting invitations and our events calendar.",
      category: "meetings"
    },
    {
      id: 20,
      question: "Are virtual meetings available?",
      answer: "Yes! We understand that not everyone can attend in-person meetings, so we offer hybrid meeting options with virtual participation via video conferencing. Most workshops and presentations are also recorded and made available to members. Virtual attendees can fully participate in discussions, ask questions, and collaborate with the team.",
      category: "meetings"
    }
  ];

  const faqAccordion = document.getElementById('faq-accordion');
  const searchInput = document.getElementById('faq-search');
  const searchClear = document.getElementById('faq-search-clear');
  const filterButtons = document.querySelectorAll('.faq-filter-btn');
  const noResults = document.getElementById('faq-no-results');

  let currentFilter = 'all';
  let searchQuery = '';
  let currentlyOpenItem = null;

  // Debounce function for search
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Create FAQ item HTML
  function createFAQItem(faq) {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.setAttribute('data-category', faq.category);
    item.setAttribute('data-id', faq.id);

    const button = document.createElement('button');
    button.className = 'faq-question';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', `faq-answer-${faq.id}`);
    button.id = `faq-question-${faq.id}`;
    
    button.innerHTML = `
      <span class="faq-question-text">${faq.question}</span>
      <span class="faq-icon" aria-hidden="true">▼</span>
    `;

    const answer = document.createElement('div');
    answer.className = 'faq-answer';
    answer.id = `faq-answer-${faq.id}`;
    answer.setAttribute('aria-labelledby', `faq-question-${faq.id}`);
    answer.setAttribute('role', 'region');
    answer.innerHTML = `<p>${faq.answer}</p>`;

    item.appendChild(button);
    item.appendChild(answer);

    // Toggle on click
    button.addEventListener('click', () => toggleFAQ(item, button));

    // Keyboard navigation
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFAQ(item, button);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextItem = item.nextElementSibling;
        if (nextItem) {
          nextItem.querySelector('.faq-question').focus();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevItem = item.previousElementSibling;
        if (prevItem) {
          prevItem.querySelector('.faq-question').focus();
        }
      } else if (e.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        button.setAttribute('aria-expanded', 'false');
        item.classList.remove('active');
        answer.style.maxHeight = null;
        currentlyOpenItem = null;
      }
    });

    return item;
  }

  // Toggle FAQ item
  function toggleFAQ(item, button) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const answer = item.querySelector('.faq-answer');

    // Close previously open item if single-open mode
    if (currentlyOpenItem && currentlyOpenItem !== item) {
      const prevButton = currentlyOpenItem.querySelector('.faq-question');
      const prevAnswer = currentlyOpenItem.querySelector('.faq-answer');
      prevButton.setAttribute('aria-expanded', 'false');
      currentlyOpenItem.classList.remove('active');
      prevAnswer.style.maxHeight = null;
    }

    // Toggle current item
    if (isExpanded) {
      button.setAttribute('aria-expanded', 'false');
      item.classList.remove('active');
      answer.style.maxHeight = null;
      currentlyOpenItem = null;
    } else {
      button.setAttribute('aria-expanded', 'true');
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      currentlyOpenItem = item;
      
      // Scroll into view smoothly
      setTimeout(() => {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 10);
    }
  }

  // Filter and render FAQs
  function renderFAQs() {
    if (!faqAccordion) return;

    let filteredData = faqData;

    // Apply category filter
    if (currentFilter !== 'all') {
      filteredData = filteredData.filter(faq => faq.category === currentFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filteredData = filteredData.filter(faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query)
      );
    }

    // Clear accordion
    faqAccordion.innerHTML = '';

    // Show/hide no results message
    if (filteredData.length === 0) {
      noResults.hidden = false;
      faqAccordion.hidden = true;
    } else {
      noResults.hidden = true;
      faqAccordion.hidden = false;

      // Create and append FAQ items
      filteredData.forEach((faq, index) => {
        const item = createFAQItem(faq);
        item.style.animationDelay = `${index * 0.05}s`;
        faqAccordion.appendChild(item);
      });
    }
  }

  // Search functionality
  const handleSearch = debounce((e) => {
    searchQuery = e.target.value;
    searchClear.hidden = !searchQuery.trim();
    renderFAQs();
  }, 300);

  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
    
    // Clear search
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        searchClear.hidden = true;
        renderFAQs();
        searchInput.focus();
      });
    }
  }

  // Category filter functionality
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      
      // Update active state
      filterButtons.forEach(b => {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      currentFilter = category;
      renderFAQs();
    });
  });

  // Initialize
  renderFAQs();

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  setTimeout(() => {
    document.querySelectorAll('.faq-item').forEach(item => {
      observer.observe(item);
    });
  }, 100);
})();


// Gallery Preview Section (Home Page)
(function() {
  'use strict';

  const galleryPreviewSection = document.querySelector('.gallery-preview-section');
  if (!galleryPreviewSection) return;

  // Get projects data if available
  const projects = window.projectsData || [
    {
      id: 1,
      title: "Smart Campus Navigation",
      description: "An augmented reality app that helps students navigate the campus with real-time updates and interactive guides.",
      tags: ["AR/VR", "Mobile App", "Navigation"],
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 2,
      title: "Eco-Friendly Energy Harvesting",
      description: "A system that captures kinetic energy from foot traffic to power campus lighting and charging stations.",
      tags: ["Sustainability", "Engineering", "Renewable Energy"],
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 3,
      title: "AI Learning Assistant",
      description: "An intelligent tutoring system that adapts to individual learning styles and provides personalized feedback.",
      tags: ["AI", "Education", "Machine Learning"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 4,
      title: "Virtual Science Lab",
      description: "An immersive VR environment where students can conduct experiments safely and access rare equipment.",
      tags: ["VR", "Education", "Simulation"],
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "#"
    }
  ];

  const galleryPreviewGrid = document.getElementById('gallery-preview-grid');
  if (!galleryPreviewGrid) return;

  // Show first 4 projects as preview
  const previewProjects = projects.slice(0, 4);

  previewProjects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'gallery-preview-card';
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="gallery-preview-image" loading="lazy">
      <div class="gallery-preview-content">
        <h3 class="gallery-preview-title">${project.title}</h3>
        <p class="gallery-preview-description">${project.description}</p>
        <div class="gallery-preview-tags">
          ${project.tags.slice(0, 2).map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    `;
    galleryPreviewGrid.appendChild(card);
  });
})();

// About Section Animations
(function() {
  'use strict';

  const aboutSection = document.querySelector('.about-section');
  if (!aboutSection) return;

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = [
    ...aboutSection.querySelectorAll('.about-hero'),
    ...aboutSection.querySelectorAll('.mission-vision-card'),
    ...aboutSection.querySelectorAll('.value-card'),
    ...aboutSection.querySelectorAll('.stat-card'),
    ...aboutSection.querySelectorAll('.story-content')
  ];

  animatedElements.forEach((element, index) => {
    // Add delay based on index for staggered animations
    element.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(element);
  });

  // Animated number counter function
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps

    const updateCounter = () => {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  // Counter observer - only animate when stat card is visible
  const statCards = aboutSection.querySelectorAll('.stat-card');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector('.stat-number');
        const target = parseInt(statNumber.getAttribute('data-target'));
        
        if (statNumber && !statNumber.hasAttribute('data-animated')) {
          statNumber.setAttribute('data-animated', 'true');
          animateCounter(statNumber, target);
        }
        
        counterObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statCards.forEach(card => {
    counterObserver.observe(card);
  });
})();

// Contact Section Animations
(function() {
  'use strict';

  const contactSection = document.querySelector('.contact-section');
  if (!contactSection) return;

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe contact hero
  const contactHero = contactSection.querySelector('.contact-hero');
  if (contactHero) {
    contactHero.style.transitionDelay = '0s';
    observer.observe(contactHero);
  }

  // Observe contact cards with staggered delays
  const contactCards = contactSection.querySelectorAll('.contact-card');
  contactCards.forEach((card, index) => {
    card.style.transitionDelay = `${0.2 + index * 0.15}s`;
    observer.observe(card);
  });

  // Observe social link cards with staggered delays
  const socialCards = contactSection.querySelectorAll('.social-link-card');
  socialCards.forEach((card, index) => {
    card.style.transitionDelay = `${0.8 + index * 0.1}s`;
    observer.observe(card);
  });
})();
