/* ==========================================================================
   NEXO FASHIONS - TRUST METRICS COUNTER ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const counterElements = document.querySelectorAll('.count-up');
    
    if (counterElements.length === 0) return;

    const animateCounter = (element) => {
        const targetAttr = element.getAttribute('data-target');
        const target = parseFloat(targetAttr);
        const prefix = element.getAttribute('data-prefix') || '';
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = parseInt(element.getAttribute('data-duration')) || 2000; // default 2 seconds
        
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Easing function - OutQuad
            const easeProgress = progress * (2 - progress);
            
            const currentValue = Math.floor(easeProgress * target);
            
            // Format large numbers cleanly
            if (target >= 1000000) {
                element.innerText = prefix + (currentValue / 1000000).toFixed(1) + 'M' + suffix;
            } else if (target >= 1000 && target < 1000000) {
                element.innerText = prefix + currentValue.toLocaleString() + suffix;
            } else {
                element.innerText = prefix + currentValue + suffix;
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Ensure absolute final value is displayed
                if (target >= 1000000) {
                    element.innerText = prefix + (target / 1000000).toFixed(0) + 'M' + suffix;
                } else {
                    element.innerText = prefix + target.toLocaleString() + suffix;
                }
            }
        };

        window.requestAnimationFrame(step);
    };

    // Trigger counters only when they enter viewport
    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target); // Animate once
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of card is visible
        });

        counterElements.forEach(counter => {
            counterObserver.observe(counter);
        });
    } else {
        // Fallback for older browsers
        counterElements.forEach(counter => {
            const targetAttr = counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            counter.innerText = targetAttr + suffix;
        });
    }
});
