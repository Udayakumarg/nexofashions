/* ==========================================================================
   NEXO FASHIONS - B2B RFQ INTAKE FORM CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const rfqForm = document.getElementById('rfq-intake-form');
    const fileZone = document.getElementById('tech-pack-zone');
    const fileInput = document.getElementById('tech-pack-file');
    const filePreview = document.getElementById('file-preview-list');

    if (!rfqForm) return;

    // --- 1. Drag & Drop File Upload Interactions ---
    if (fileZone && fileInput) {
        ['dragenter', 'dragover'].forEach(eventName => {
            fileZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                fileZone.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            fileZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                fileZone.classList.remove('dragover');
            }, false);
        });

        fileZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            fileInput.files = files;
            updateFilePreview(files);
        });

        fileInput.addEventListener('change', (e) => {
            updateFilePreview(e.target.files);
        });
    }

    const updateFilePreview = (files) => {
        if (files.length === 0) {
            filePreview.innerHTML = '';
            return;
        }
        const file = files[0];
        // Format file size
        const sizeKB = (file.size / 1024).toFixed(1);
        filePreview.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.9rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-luxury-gold);"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                <span>Attached: <strong>${file.name}</strong> (${sizeKB} KB)</span>
                <button type="button" id="remove-file-btn" style="background: none; border: none; color: #EF4444; font-weight: bold; cursor: pointer; padding: 0 4px;">&times;</button>
            </div>
        `;

        // Bind remove button
        document.getElementById('remove-file-btn').addEventListener('click', () => {
            fileInput.value = '';
            filePreview.innerHTML = '';
        });
    };


    // --- 2. Asynchronous RFQ Submission & Premium Thank You Popup ---
    rfqForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Perform basic input validation
        const requiredInputs = rfqForm.querySelectorAll('[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#EF4444'; // Red error border
            } else {
                input.style.borderColor = '';
            }
        });

        if (!isValid) {
            alert('Please fill out all required fields marked with *');
            return;
        }

        // Show premium feedback submission card
        const formParent = rfqForm.parentElement;
        formParent.style.opacity = '0.5';

        // Simulate secure API dispatch delay
        setTimeout(() => {
            formParent.style.opacity = '1';
            
            // Inject luxury feedback screen
            formParent.innerHTML = `
                <div class="reveal active" style="text-align: center; padding: var(--space-xl) var(--space-md); background: var(--color-bg-white); border-radius: var(--border-radius-sm); border: 1px solid var(--color-luxury-gold); box-shadow: var(--shadow-lg);">
                    <div style="width: 80px; height: 80px; background-color: rgba(15, 118, 110, 0.08); border: 2px solid var(--color-luxury-gold); border-radius: var(--border-radius-full); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-md) auto;">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-luxury-gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <h2 style="font-family: var(--font-heading); color: var(--color-primary-dark); margin-bottom: var(--space-sm); font-size: 2.25rem;">RFQ Sourcing Request Initiated</h2>
                    <p style="color: var(--color-text-secondary); max-width: 580px; margin: 0 auto var(--space-lg) auto; font-size: 1.1rem; line-height: 1.7;">
                        Thank you for choosing Nexo Fashions. Our dedicated apparel procurement team in Tiruppur is analyzing your tech sheets and category requirements. 
                        We will pair you with the top audited factories and email a preliminary cost matrix and timeline within **24 business hours**.
                    </p>
                    <div style="display: flex; justify-content: center; gap: var(--space-md);">
                        <a href="index.html" class="btn btn-primary" style="font-size: 0.8rem;">Return to Homepage</a>
                        <a href="https://wa.me/919876543210" class="btn btn-secondary" style="font-size: 0.8rem; display: inline-flex; align-items: center; gap: 8px;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.948 9.948 0 0 0 4.775 1.218h.004c5.505 0 9.988-4.478 9.99-9.984a9.983 9.983 0 0 0-9.99-9.985M17.47 16.63c-.3.84-1.53 1.54-2.12 1.63-.59.09-1.36.17-3.93-.88-3.29-1.35-5.42-4.71-5.58-4.93-.16-.22-1.35-1.79-1.35-3.42S5.33 6.2 5.56 5.97c.23-.23.5-.29.66-.29.17 0 .34 0 .49.01.16.01.37-.06.58.45.22.53.75 1.83.82 1.97.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.31.32-.13.63.18.31.81 1.33 1.74 2.16 1.2 1.07 2.21 1.4 2.52 1.56.31.15.49.13.68-.08.19-.22.82-.95 1.04-1.28.22-.33.44-.28.74-.17.3.11 1.91.9 2.24 1.06.33.16.55.24.63.38.08.14.08.82-.22 1.66z"/></svg>
                            Connect via WhatsApp
                        </a>
                    </div>
                </div>
            `;
            window.scrollTo({ top: formParent.offsetTop - 120, behavior: 'smooth' });
        }, 1500);
    });
});
