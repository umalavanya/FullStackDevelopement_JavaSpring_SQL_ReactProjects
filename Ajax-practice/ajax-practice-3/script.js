// Simulated API endpoints (using JSONPlaceholder for practice)
const API_BASE = 'https://jsonplaceholder.typicode.com';

// Helper function for making AJAX requests
async function makeRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Check if username is available
async function checkUsername(username) {
    if (!username || username.length < 3) {
        return { available: false, message: 'Username must be at least 3 characters' };
    }
    
    // Simulate API call to check username
    const result = await makeRequest(`${API_BASE}/users`);
    
    if (result.success) {
        // Simulate checking against existing users
        const takenUsernames = ['john_doe', 'jane_smith', 'admin'];
        const isTaken = takenUsernames.includes(username.toLowerCase());
        
        // Add artificial delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 800));
        
        return {
            available: !isTaken,
            message: isTaken ? 'Username already taken' : 'Username available'
        };
    }
    
    return { available: false, message: 'Error checking username' };
}

// Check if email is valid and not taken
async function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Invalid email format' };
    }
    
    // Simulate API call to check email
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const takenEmails = ['john@example.com', 'jane@example.com'];
    const isTaken = takenEmails.includes(email.toLowerCase());
    
    return {
        valid: !isTaken,
        message: isTaken ? 'Email already registered' : 'Email is valid'
    };
}

// Submit registration data
async function submitRegistration(userData) {
    // Simulate form submission
    const result = await makeRequest(`${API_BASE}/posts`, {
        method: 'POST',
        body: JSON.stringify(userData)
    });
    
    if (result.success) {
        return { success: true, message: 'Registration successful!' };
    } else {
        return { success: false, message: 'Registration failed. Please try again.' };
    }
}

// Form validation with async/await
async function validateField(fieldName, value) {
    switch(fieldName) {
        case 'username':
            return await checkUsername(value);
        case 'email':
            return await checkEmail(value);
        default:
            return { valid: true };
    }
}

// Main form submission handler
document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('spinner');
    const messageDiv = document.getElementById('message');
    
    // Clear previous messages
    messageDiv.innerHTML = '';
    document.getElementById('usernameError').innerHTML = '';
    document.getElementById('emailError').innerHTML = '';
    
    // Get form values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Disable button and show spinner
    submitBtn.disabled = true;
    spinner.style.display = 'inline-block';
    
    try {
        // Validate all fields
        const [usernameCheck, emailCheck] = await Promise.all([
            validateField('username', username),
            validateField('email', email)
        ]);
        
        // Display validation errors
        if (!usernameCheck.available) {
            document.getElementById('usernameError').innerHTML = usernameCheck.message;
        }
        
        if (!emailCheck.valid) {
            document.getElementById('emailError').innerHTML = emailCheck.message;
        }
        
        // If validation passes, submit the form
        if (usernameCheck.available && emailCheck.valid && password.length >= 6) {
            messageDiv.innerHTML = '<div class="loading">Submitting registration...</div>';
            
            const result = await submitRegistration({
                username,
                email,
                password
            });
            
            if (result.success) {
                messageDiv.innerHTML = `<div class="success">${result.message}</div>`;
                document.getElementById('registrationForm').reset();
            } else {
                messageDiv.innerHTML = `<div class="error">${result.message}</div>`;
            }
        } else if (password.length < 6) {
            messageDiv.innerHTML = '<div class="error">Password must be at least 6 characters</div>';
        }
        
    } catch (error) {
        console.error('Error:', error);
        messageDiv.innerHTML = '<div class="error">An unexpected error occurred</div>';
    } finally {
        // Re-enable button and hide spinner
        submitBtn.disabled = false;
        spinner.style.display = 'none';
    }
});

// Real-time validation with debouncing
let debounceTimer;

async function handleRealTimeValidation(fieldName, value) {
    clearTimeout(debounceTimer);
    
    debounceTimer = setTimeout(async () => {
        const errorDiv = document.getElementById(`${fieldName}Error`);
        const result = await validateField(fieldName, value);
        
        if (fieldName === 'username') {
            errorDiv.innerHTML = result.available ? 
                '<span style="color: green;">✓ ' + result.message + '</span>' : 
                '<span style="color: red;">✗ ' + result.message + '</span>';
        } else if (fieldName === 'email') {
            errorDiv.innerHTML = result.valid ? 
                '<span style="color: green;">✓ ' + result.message + '</span>' : 
                '<span style="color: red;">✗ ' + result.message + '</span>';
        }
    }, 500);
}

// Add real-time validation
document.getElementById('username').addEventListener('input', (e) => {
    handleRealTimeValidation('username', e.target.value);
});

document.getElementById('email').addEventListener('input', (e) => {
    handleRealTimeValidation('email', e.target.value);
});