// script.js - Heart Exploit Game Logic

// Heart rain animation for background
function createHeartRain() {
    // Check if hearts already exist
    if (document.querySelector('.heart-rain')) return;
    
    const rainContainer = document.createElement('div');
    rainContainer.className = 'heart-rain';
    document.body.appendChild(rainContainer);
    
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('span');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
        heart.style.opacity = '0.2';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.animationDelay = Math.random() * 5 + 's';
        rainContainer.appendChild(heart);
    }
    
    // Add keyframe animation for falling hearts
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% { transform: translateY(-100px) rotate(0deg); opacity: 0.2; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Typing effect for final message - SAFE VERSION
function typeWriter(element, text, speed = 50, callback) {
    // Check if element exists
    if (!element) {
        console.log('Typewriter element not found - skipping animation');
        return;
    }
    
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

// Password check for Level 2
function checkPassword() {
    const input = document.getElementById('password-input');
    const message = document.getElementById('message');
    
    if (!input || !message) return;
    
    // PERSONALIZE THESE! Add their name and qualities you love about them
    const qualities = [
        "brilliant", "kind", "funny", "gorgeous", 
        "amazing", "smart", "beautiful", "wonderful",
        "perfect", "incredible", "cute", "adorable",
        "intelligent", "sweet", "thoughtful"
        // ADD THEIR NAME HERE! 👇
        // "sarah", "john", "alex"  <-- CHANGE THESE TO THEIR NAME!
    ];
    
    const userInput = input.value.toLowerCase().trim();
    
    if (qualities.includes(userInput)) {
        message.innerHTML = '<span class="access-granted">✓ ACCESS GRANTED. That quality is definitely you. Proceeding to next level...</span>';
        setTimeout(() => {
            window.location.href = 'level3.html?status=crush';
        }, 2000);
    } else {
        message.innerHTML = '<span class="access-denied">✗ ACCESS DENIED. That quality isn\'t in my database of what I admire about you. Try another.</span>';
    }
}

// Check URL parameters for Level 3
function checkStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const statusDisplay = document.getElementById('status-display');
    const exploitBtn = document.getElementById('exploit-btn');
    const successMessage = document.getElementById('success-message');
    
    if (statusDisplay) {
        statusDisplay.textContent = status || 'crush';
    }
    
    // Check if they've already exploited it
    if (successMessage && (status === 'date' || status === 'partner' || status === 'girlfriend' || status === 'boyfriend' || (status && status !== 'crush'))) {
        successMessage.style.display = 'block';
        if (exploitBtn) exploitBtn.style.display = 'none';
        
        // Personalize the message if they used a custom status
        if (status && status !== 'date' && status !== 'partner') {
            const secretFile = successMessage.querySelector('p:nth-child(4)');
            if (secretFile) {
                secretFile.innerHTML = `♥ SECRET FILE: "You changed the status to '${status}'? That's creative. How about we make that official?"`;
            }
        }
    }
    
    // The "exploit" hint
    if (exploitBtn) {
        exploitBtn.addEventListener('click', () => {
            alert('🔍 Hint: Check the URL. Try changing the "status" parameter. Maybe to something like "date"?');
        });
    }
}

// Set progress bar based on current level
function setProgress(level) {
    const progress = document.getElementById('progress');
    if (progress) {
        progress.style.width = (level * 20) + '%';
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Start heart rain
    createHeartRain();
    
    // Determine current level from URL
    const path = window.location.pathname;
    const fileName = path.split('/').pop() || 'index.html';
    
    // Set progress based on current page
    if (fileName.includes('level2')) {
        setProgress(2);
    } else if (fileName.includes('level3')) {
        setProgress(3);
        checkStatus();
    } else if (fileName.includes('level4')) {
        setProgress(4);
    } else if (fileName.includes('final')) {
        setProgress(5);
    } else {
        setProgress(1);
    }
    
    // Add Enter key support for level 2
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
    
    // Check for level 4 decode button
    const decodeBtn = document.querySelector('button[onclick="checkDecode()"]');
    if (decodeBtn) {
        // The checkDecode function is already in level4.html
        console.log('Level 4 detected - decode function available');
    }
    
    console.log('Heart Exploit Game initialized - Level based on:', fileName);
});

// Export for global use
window.checkPassword = checkPassword;