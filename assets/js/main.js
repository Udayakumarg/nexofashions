/* ==========================================================================
   NEXO FASHIONS - CORE JAVASCRIPT CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Sticky Navigation & Header Transitions ---
    const header = document.querySelector('.site-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Initial check on load
    handleScroll();
    window.addEventListener('scroll', handleScroll);


    // --- 2. Mobile Hamburger Menu Drawer ---
    const mobileTrigger = document.querySelector('.mobile-trigger');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const drawerLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileTrigger && mobileDrawer) {
        const toggleDrawer = () => {
            mobileTrigger.classList.toggle('active');
            mobileDrawer.classList.toggle('active');
            
            // Prevent body scroll when menu is active
            if (mobileDrawer.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        mobileTrigger.addEventListener('click', toggleDrawer);

        // Close drawer when link is clicked
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileTrigger.classList.remove('active');
                mobileDrawer.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }


    // --- 3. Dynamic Active Navigation Highlighting ---
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    const navItems = document.querySelectorAll('.nav-menu .nav-item');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-list li');

    const updateActiveNav = (items, attribute) => {
        items.forEach(item => {
            const link = item.querySelector('a');
            if (link) {
                const href = link.getAttribute('href');
                if (href === pageName || (pageName === '' && href === 'index.html')) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
    };

    updateActiveNav(navItems);
    updateActiveNav(mobileNavItems);


    // --- 4. Intersection Observer Reveal Engine ---
    const revealElements = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once revealed to enhance page performance
                    observer.unobserve(entry.target);
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null,
            threshold: 0.12, // Reveal when 12% is visible
            rootMargin: '0px 0px -40px 0px' // Offset slightly before entering screen
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add('active');
        });
    }

    // --- 5. 3D Parallax "Dancing Cards" Hover Engine ---
    const tiltCards = document.querySelectorAll('.tilt-card, .service-card, .industry-card, .case-card, .cert-card');
    
    // Only apply on non-touch devices to ensure perfect mobile scrolling
    if (window.matchMedia('(hover: hover)').matches) {
        tiltCards.forEach(card => {
            // Setup card properties for 3D render depth
            card.style.transformStyle = 'preserve-3d';
            
            card.addEventListener('mouseenter', () => {
                // Short transition for ultra-responsive mouse following
                card.style.transition = 'transform 0.1s ease-out, box-shadow 0.15s ease-out';
            });
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Tilt rotation math (max 7 degrees for elegant premium luxury touch)
                const rotateX = ((centerY - y) / centerY) * 7;
                const rotateY = ((x - centerX) / centerX) * 7;
                
                // Apply hardware-accelerated 3D transforms
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02) translateY(-6px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                // Restore beautiful slow luxury transition for smooth recovery
                card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0)';
            });
        });
    }
});
