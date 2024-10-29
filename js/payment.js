document.addEventListener('DOMContentLoaded', function() {
    // Load saved UPI data
    const upiData = JSON.parse(localStorage.getItem('upiData'));
    if (upiData) {
        document.getElementById('userName').value = upiData.name || '';
        document.getElementById('upiId').textContent = upiData.upiId || '';
    }

    // Set default amount
    document.getElementById('amount').value = '0';

    const swipeButton = document.getElementById('swipe-button');
    const swipeContainer = document.getElementById('swipe-container');
    let isDragging = false;
    let startX, currentX;
    let buttonPosition = 0;
    
    // Calculate the maximum distance the button can slide
    const maxSlide = swipeContainer.offsetWidth - swipeButton.offsetWidth - 6;

    function handleStart(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        buttonPosition = swipeButton.offsetLeft;
    }

    function handleMove(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const diff = currentX - startX;
        let newPosition = buttonPosition + diff;

        newPosition = Math.max(3, Math.min(newPosition, maxSlide));
        swipeButton.style.left = `${newPosition}px`;

        if (newPosition >= maxSlide * 0.9) {
            handleSuccess();
        }
    }

    function handleEnd() {
        if (!isDragging) return;
        isDragging = false;

        if (swipeButton.offsetLeft < maxSlide * 0.9) {
            swipeButton.style.transition = 'left 0.3s ease-in-out';
            swipeButton.style.left = '3px';
            setTimeout(() => {
                swipeButton.style.transition = '';
            }, 300);
        }
    }

    function handleSuccess() {
        // Validate user name
        const userName = document.getElementById('userName').value.trim();
        if (!userName) {
            alert('Please enter your name');
            resetSwipe();
            return;
        }

        isDragging = false;
        swipeButton.style.transition = 'left 0.3s ease-in-out';
        swipeButton.style.left = `${maxSlide}px`;
        
        // Save the updated user name
        const upiData = {
            name: userName,
            upiId: document.getElementById('upiId').textContent,
            amount: document.getElementById('amount').value,
        };
        localStorage.setItem('upiData', JSON.stringify(upiData));

        // Disable swipe functionality
        removeEventListeners();

        // Show success animation
        swipeContainer.style.background = 'var(--success-color)';
        
        setTimeout(() => {
            window.location.href = 'pin.html';
        }, 500);
    }

    function resetSwipe() {
        isDragging = false;
        swipeButton.style.transition = 'left 0.3s ease-in-out';
        swipeButton.style.left = '3px';
        setTimeout(() => {
            swipeButton.style.transition = '';
        }, 300);
    }

    function removeEventListeners() {
        swipeButton.removeEventListener('mousedown', handleStart);
        swipeButton.removeEventListener('touchstart', handleStart);
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchend', handleEnd);
    }

    // Add back button functionality
    document.querySelector('.back-button').addEventListener('click', () => {
        window.history.back();
    });

    // Mouse Events
    swipeButton.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);

    // Touch Events
    swipeButton.addEventListener('touchstart', handleStart);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
});
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the name and UPI ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const upiId = urlParams.get('upiId');

    // Populate the input fields
    if (name) {
        document.getElementById('userName').value = decodeURIComponent(name);
    }
    if (upiId) {
        document.getElementById('upiId').textContent = decodeURIComponent(upiId);
    }

    // Load saved UPI data
    const upiData = JSON.parse(localStorage.getItem('upiData'));
    if (upiData) {
        document.getElementById('userName').value = upiData.name || '';
        document.getElementById('upiId').textContent = upiData.upiId || '';
    }

    // Set default amount
    document.getElementById('amount').value = '0';

    // Add event listeners for swipe functionality
    // (existing code)

    // Save button event listener
    document.getElementById('saveButton').addEventListener('click', () => {
        const userName = document.getElementById('userName').value.trim();
        const upiId = document.getElementById('upiId').textContent.trim();
        const amount = document.getElementById('amount').value;

        if (userName && upiId) {
            const savedContacts = JSON.parse(localStorage.getItem('savedContacts')) || [];
            savedContacts.push({ name: userName, upiId, amount });
            localStorage.setItem('savedContacts', JSON.stringify(savedContacts));
            alert('User information saved!');
        } else {
            alert('Please enter your name and UPI ID.');
        }
    });
});