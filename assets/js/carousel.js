/* ==========================================================================
   NEXO FASHIONS - MODULAR CAROUSEL & SLIDER MANAGER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Testimonial Carousel Setup ---
    const initTestimonialSlider = () => {
        const wrapper = document.querySelector('.testimonial-wrapper');
        const container = document.querySelector('.testimonial-container');
        const slides = document.querySelectorAll('.testimonial-slide');
        const dotsContainer = document.querySelector('.testimonial-dots');
        
        if (!wrapper || !container || slides.length === 0) return;

        let currentIndex = 0;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let isDragging = false;
        let animationID = 0;
        let autoplayTimer = null;

        // Clear existing dots and re-render them programmatically
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to testimonial slide ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.testimonial-dot');

        const updateSlider = () => {
            container.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        const goToSlide = (index) => {
            currentIndex = index;
            updateSlider();
            resetAutoplay();
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        };

        // Autoplay functions
        const startAutoplay = () => {
            autoplayTimer = setInterval(nextSlide, 6000); // Rotate every 6 seconds
        };

        const resetAutoplay = () => {
            clearInterval(autoplayTimer);
            startAutoplay();
        };

        // Touch gestures for mobile compatibility
        const getPositionX = (event) => {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        };

        const touchStart = (index) => {
            return function (event) {
                isDragging = true;
                startX = getPositionX(event);
                clearInterval(autoplayTimer);
            };
        };

        const touchMove = (event) => {
            if (!isDragging) return;
            const currentX = getPositionX(event);
            const diffX = currentX - startX;
            
            // Limit movement range slightly on swipe
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe Right (Previous)
                    currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
                } else {
                    // Swipe Left (Next)
                    currentIndex = (currentIndex + 1) % slides.length;
                }
                isDragging = false;
                updateSlider();
                resetAutoplay();
            }
        };

        const touchEnd = () => {
            isDragging = false;
            resetAutoplay();
        };

        // Bind events
        container.addEventListener('touchstart', touchStart());
        container.addEventListener('touchend', touchEnd);
        container.addEventListener('touchmove', touchMove);

        // Desktop mouse support for swipe
        container.addEventListener('mousedown', touchStart());
        container.addEventListener('mouseup', touchEnd);
        container.addEventListener('mouseleave', touchEnd);
        container.addEventListener('mousemove', touchMove);

        // Start autoplay
        startAutoplay();
    };

    initTestimonialSlider();
});
